"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/salesforce/AuthContext";
import { sfQuery } from "@/lib/salesforce/client";
import { USE_SALESFORCE } from "@/lib/salesforce/config";
import type { SfRecord } from "@/lib/salesforce/client";

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  preferredDate: string;
  numberOfDivers: number;
  certificationLevel: string;
  status: string;
}

function mapBooking(r: SfRecord): Booking {
  return {
    id: r.Id,
    firstName: String(r.First_Name__c || ""),
    lastName: String(r.Last_Name__c || ""),
    email: String(r.Email__c || ""),
    preferredDate: String(r.Preferred_Date__c || ""),
    numberOfDivers: Number(r.Number_of_Divers__c) || 0,
    certificationLevel: String(r.Certification_Level__c || ""),
    status: String(r.Status__c || "New"),
  };
}

export default function AdminBookings() {
  const { accessToken, instanceUrl } = useAuth();
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  const shouldFetch = USE_SALESFORCE && !!accessToken && !!instanceUrl;

  useEffect(() => {
    if (!shouldFetch) return;

    sfQuery(
      `SELECT Id, First_Name__c, Last_Name__c, Email__c, Preferred_Date__c,
              Number_of_Divers__c, Certification_Level__c, Status__c
       FROM Booking__c ORDER BY CreatedDate DESC`,
      accessToken!,
      instanceUrl!
    )
      .then((result) => setBookings(result.records.map(mapBooking)))
      .catch(() => setBookings([]));
  }, [shouldFetch, accessToken, instanceUrl]);

  const loading = shouldFetch && bookings === null;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-ocean-200 border-t-ocean-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ocean-900">Bookings</h1>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ocean-100">
              <th className="px-4 py-3 font-semibold text-ocean-700">Name</th>
              <th className="px-4 py-3 font-semibold text-ocean-700">Email</th>
              <th className="px-4 py-3 font-semibold text-ocean-700">Date</th>
              <th className="px-4 py-3 font-semibold text-ocean-700">Divers</th>
              <th className="px-4 py-3 font-semibold text-ocean-700">Level</th>
              <th className="px-4 py-3 font-semibold text-ocean-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {!bookings?.length ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ocean-400">
                  {USE_SALESFORCE
                    ? "No bookings found."
                    : "Connect Salesforce to view bookings."}
                </td>
              </tr>
            ) : (
              (bookings ?? []).map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-ocean-50 hover:bg-ocean-50/50"
                >
                  <td className="px-4 py-3 text-ocean-800">
                    {b.firstName} {b.lastName}
                  </td>
                  <td className="px-4 py-3 text-ocean-800">{b.email}</td>
                  <td className="px-4 py-3 text-ocean-800">{b.preferredDate}</td>
                  <td className="px-4 py-3 text-ocean-800">{b.numberOfDivers}</td>
                  <td className="px-4 py-3 text-ocean-800 capitalize">
                    {b.certificationLevel}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-ocean-100 px-2.5 py-0.5 text-xs font-medium text-ocean-700">
                      {b.status}
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
