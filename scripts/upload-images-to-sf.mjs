#!/usr/bin/env node
/**
 * Upload local destination images to Salesforce as ContentVersion files,
 * create public ContentDistribution links, and update Destination__c.Image_Path__c.
 *
 * Usage: node scripts/upload-images-to-sf.mjs
 * Requires: sf CLI authenticated to the scuba-dev org
 */

import { execSync } from "child_process";
import { readFileSync, readdirSync } from "fs";
import path from "path";

const ORG_ALIAS = "scuba-dev";
const API_VERSION = "v60.0";
const IMAGES_DIR = path.resolve("public/images/destinations");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getOrgInfo() {
  const raw = execSync(`sf org display -o ${ORG_ALIAS} --json`, {
    encoding: "utf-8",
  });
  const { result } = JSON.parse(raw);
  return {
    accessToken: result.accessToken,
    instanceUrl: result.instanceUrl,
  };
}

async function sfRest(instanceUrl, accessToken, urlPath, options = {}) {
  const url = `${instanceUrl}/services/data/${API_VERSION}${urlPath}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`SF API ${res.status}: ${text}`);
  }
  return text ? JSON.parse(text) : null;
}

async function sfQuery(instanceUrl, accessToken, soql) {
  return sfRest(instanceUrl, accessToken, `/query?q=${encodeURIComponent(soql)}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { accessToken, instanceUrl } = getOrgInfo();
  console.log(`Connected to ${instanceUrl}\n`);

  // 1. Get all destinations with their current Image_Path__c
  const destResult = await sfQuery(
    instanceUrl,
    accessToken,
    "SELECT Id, Name, Slug__c, Image_Path__c FROM Destination__c"
  );
  const destinations = destResult.records;
  console.log(`Found ${destinations.length} destinations in Salesforce\n`);

  // 2. Map slug → local image file
  const imageFiles = readdirSync(IMAGES_DIR).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );
  console.log(`Found ${imageFiles.length} image files locally\n`);

  // Build slug → filename map based on convention: slug matches filename (without ext)
  const slugToFile = {};
  for (const file of imageFiles) {
    const name = path.basename(file, path.extname(file));
    slugToFile[name] = file;
  }

  for (const dest of destinations) {
    const slug = dest.Slug__c;
    const fileName = slugToFile[slug];

    if (!fileName) {
      console.log(`⚠  No local image for "${dest.Name}" (${slug}), skipping`);
      continue;
    }

    console.log(`📷 Uploading image for "${dest.Name}" (${fileName})...`);

    // 3. Read file and base64-encode
    const filePath = path.join(IMAGES_DIR, fileName);
    const fileData = readFileSync(filePath);
    const base64Data = fileData.toString("base64");

    // 4. Create ContentVersion
    const cvResult = await sfRest(
      instanceUrl,
      accessToken,
      "/sobjects/ContentVersion",
      {
        method: "POST",
        body: JSON.stringify({
          Title: `destination-${slug}`,
          PathOnClient: fileName,
          VersionData: base64Data,
          Description: `Destination image for ${dest.Name}`,
        }),
      }
    );
    const contentVersionId = cvResult.id;
    console.log(`   ContentVersion created: ${contentVersionId}`);

    // 5. Get the ContentDocumentId
    const cvQuery = await sfQuery(
      instanceUrl,
      accessToken,
      `SELECT ContentDocumentId FROM ContentVersion WHERE Id = '${contentVersionId}'`
    );
    const contentDocumentId = cvQuery.records[0].ContentDocumentId;
    console.log(`   ContentDocument: ${contentDocumentId}`);

    // 6. Create ContentDistribution (public link)
    const cdResult = await sfRest(
      instanceUrl,
      accessToken,
      "/sobjects/ContentDistribution",
      {
        method: "POST",
        body: JSON.stringify({
          Name: `dest-${slug}`,
          ContentVersionId: contentVersionId,
          PreferencesAllowViewInBrowser: true,
          PreferencesLinkLatestVersion: true,
          PreferencesNotifyOnVisit: false,
          PreferencesPasswordRequired: false,
          PreferencesAllowOriginalDownload: true,
        }),
      }
    );
    const distributionId = cdResult.id;

    // 7. Query back to get the public URL
    const distQuery = await sfQuery(
      instanceUrl,
      accessToken,
      `SELECT ContentDownloadUrl, DistributionPublicUrl FROM ContentDistribution WHERE Id = '${distributionId}'`
    );
    const dist = distQuery.records[0];
    const publicUrl = dist.ContentDownloadUrl || dist.DistributionPublicUrl;
    console.log(`   Public URL: ${publicUrl}`);

    // 8. Update Destination__c.Image_Path__c
    await sfRest(
      instanceUrl,
      accessToken,
      `/sobjects/Destination__c/${dest.Id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          Image_Path__c: publicUrl,
        }),
      }
    );
    console.log(`   ✅ Updated ${dest.Name} Image_Path__c\n`);
  }

  // 9. Verify
  console.log("--- Verification ---");
  const verifyResult = await sfQuery(
    instanceUrl,
    accessToken,
    "SELECT Name, Slug__c, Image_Path__c FROM Destination__c ORDER BY Name"
  );
  for (const r of verifyResult.records) {
    console.log(`${r.Name}: ${r.Image_Path__c}`);
  }
  console.log("\nDone! All destination images uploaded to Salesforce.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
