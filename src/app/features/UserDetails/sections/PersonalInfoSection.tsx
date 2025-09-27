"use client";

import { User as UserType } from "@/types/user";

interface Props {
  user: UserType;
}

export default function PersonalInfoSection({ user }: Props) {
  return (
    <div>
      <h3 className="text-base font-medium text-text-primary mb-6">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-6">
        <Field label="Full Name" value={user.fullName} />
        <Field label="Phone Number" value={user.phoneNumber} />
        <Field label="Email Address" value={user.email} />
        <Field label="BVN" value={user.bvn} />
        <Field label="Gender" value={user.gender} />
        <Field label="Marital Status" value={user.maritalStatus} />
        <Field label="Children" value={user.children || "None"} />
        <Field label="Type of Residence" value={user.typeOfResidence} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs font-normal text-text-secondary uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-base font-medium text-text-secondary break-words">
        {value}
      </p>
    </div>
  );
}
