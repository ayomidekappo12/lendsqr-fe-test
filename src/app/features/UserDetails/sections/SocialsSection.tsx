"use client";

import { User as UserType } from "@/types/user";

interface Props {
  user: UserType;
}

export default function SocialsSection({ user }: Props) {
  return (
    <div>
      <h3 className="text-base font-medium text-text-primary mb-6">Socials</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        <Field label="Twitter" value={user.twitter || "@grace_effiom"} />
        <Field label="Facebook" value={user.facebook || "Grace Effiom"} />
        <Field label="Instagram" value={user.instagram || "@grace_effiom"} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-normal text-text-secondary uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-base font-medium text-text-secondary">
        {value}
      </p>
    </div>
  );
}
