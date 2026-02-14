"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/salesforce/AuthContext";
import { sfQuery } from "@/lib/salesforce/client";
import { USE_SALESFORCE } from "@/lib/salesforce/config";
import type { SfRecord } from "@/lib/salesforce/client";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
}

function mapContact(r: SfRecord): ContactSubmission {
  return {
    id: r.Id,
    name: String(r.Name || ""),
    email: String(r.Email__c || ""),
    subject: String(r.Subject__c || ""),
    message: String(r.Message__c || ""),
    status: String(r.Status__c || "New"),
  };
}

export default function AdminContacts() {
  const { accessToken, instanceUrl } = useAuth();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!USE_SALESFORCE || !accessToken || !instanceUrl) {
      setLoading(false);
      return;
    }

    sfQuery(
      `SELECT Id, Name, Email__c, Subject__c, Message__c, Status__c
       FROM Contact_Submission__c ORDER BY CreatedDate DESC`,
      accessToken,
      instanceUrl
    )
      .then((result) => setContacts(result.records.map(mapContact)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [accessToken, instanceUrl]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-ocean-200 border-t-ocean-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ocean-900">
        Contact Submissions
      </h1>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ocean-100">
              <th className="px-4 py-3 font-semibold text-ocean-700">Name</th>
              <th className="px-4 py-3 font-semibold text-ocean-700">Email</th>
              <th className="px-4 py-3 font-semibold text-ocean-700">Subject</th>
              <th className="px-4 py-3 font-semibold text-ocean-700">Message</th>
              <th className="px-4 py-3 font-semibold text-ocean-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ocean-400">
                  {USE_SALESFORCE
                    ? "No contact submissions found."
                    : "Connect Salesforce to view contacts."}
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-ocean-50 hover:bg-ocean-50/50"
                >
                  <td className="px-4 py-3 text-ocean-800">{c.name}</td>
                  <td className="px-4 py-3 text-ocean-800">{c.email}</td>
                  <td className="px-4 py-3 text-ocean-800 capitalize">
                    {c.subject}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-ocean-800">
                    {c.message}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-ocean-100 px-2.5 py-0.5 text-xs font-medium text-ocean-700">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
