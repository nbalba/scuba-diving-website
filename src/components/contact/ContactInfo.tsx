import { MapPin, Phone, Mail, Clock } from "lucide-react";

const info = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Coral Way, Marina Bay, FL 33101",
  },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: Mail, label: "Email", value: "info@deepbluediving.com" },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 8AM–6PM, Sun: 9AM–4PM" },
];

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-ocean-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-ocean-900">Get in Touch</h3>
        <ul className="space-y-4">
          {info.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-ocean-500" />
              <div>
                <p className="text-sm font-medium text-ocean-900">
                  {item.label}
                </p>
                <p className="text-sm text-ocean-600">{item.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Map placeholder */}
      <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-ocean-100 text-ocean-400">
        Map Coming Soon
      </div>
    </div>
  );
}
