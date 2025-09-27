"use client";

import { Guarantor } from "@/types/user";

export default function GuarantorSection({
  guarantors,
}: {
  guarantors?: Guarantor[];
}) {
  if (!guarantors || guarantors.length === 0) return null;

  return (
    <div>
      <h3 className="text-base font-medium text-text-primary mb-6">
        Guarantor{guarantors.length > 1 ? "s" : ""}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
        {guarantors.map((g, idx) => (
          <Field key={idx} label="Full Name" value={g.fullName} />
        ))}
        {guarantors.map((g, idx) => (
          <Field
            key={idx + "phone"}
            label="Phone Number"
            value={g.phoneNumber}
          />
        ))}
        {guarantors.map((g, idx) => (
          <Field key={idx + "email"} label="Email Address" value={g.email} />
        ))}
        {guarantors.map((g, idx) => (
          <Field
            key={idx + "rel"}
            label="Relationship"
            value={g.relationship}
          />
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs font-normal text-text-secondary uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-base font-medium text-text-secondary">
        {value || "—"}
      </p>
    </div>
  );
}
