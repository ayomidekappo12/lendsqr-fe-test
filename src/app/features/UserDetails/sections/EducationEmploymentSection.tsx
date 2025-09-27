"use client";

import { User as UserType } from "@/types/user";

interface Props {
  user: UserType;
}

export default function EducationEmploymentSection({ user }: Props) {
  return (
    <div>
      <h3 className="text-base font-medium text-text-primary mb-6">
        Education and Employment
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
        <Field label="Level of Education" value={user.levelOfEducation} />
        <Field label="Employment Status" value={user.employmentStatus} />
        <Field label="Sector of Employment" value={user.sectorOfEmployment} />
        <Field
          label="Duration of Employment"
          value={user.durationOfEmployment}
        />
        <Field label="Office Email" value={user.officeEmail} />
        <Field
          label="Monthly Income"
          value={`${user.monthlyIncome[0]} - ${user.monthlyIncome[1]}`}
        />

        <Field label="Loan Repayment" value={user.loanRepayment} />
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
      <p className="text-base font-medium text-text-secondary break-words">
        {value}
      </p>
    </div>
  );
}
