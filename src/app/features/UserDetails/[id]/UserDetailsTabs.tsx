"use client";

import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { User as UserType } from "@/types/user";
import PersonalInfoSection from "../sections/PersonalInfoSection";
import EducationEmploymentSection from "../sections/EducationEmploymentSection";
import SocialsSection from "../sections/SocialsSection";
import GuarantorSection from "../sections/GuarantorSection";

interface UserDetailsTabsProps {
  user: UserType;
}

export default function UserDetailsTabs({ user }: UserDetailsTabsProps) {
  return (
    <Card className="w-96 sm:w-full border-border">
      {/* General Details */}
      <TabsContent value="general" className="p-6">
        <div className="space-y-8">
          <PersonalInfoSection user={user} />
          <hr className="border-border" />
          <EducationEmploymentSection user={user} />
          <hr className="border-border" />
          <SocialsSection user={user} />
          <hr className="border-border" />
          <GuarantorSection />
        </div>
      </TabsContent>

      {/* Documents */}
      <TabsContent value="documents" className="p-6">
        <div className="text-center py-12 text-text-secondary">
          No documents available
        </div>
      </TabsContent>

      {/* Bank Details */}
      <TabsContent value="bank" className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase mb-2">
              Account Number
            </p>
            <p className="text-sm text-text-primary">{user.accountNumber}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase mb-2">
              Bank
            </p>
            <p className="text-sm text-text-primary">{user.bank}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase mb-2">
              Account Balance
            </p>
            <p className="text-sm text-text-primary">{user.accountBalance}</p>
          </div>
        </div>
      </TabsContent>

      {/* Loans */}
      <TabsContent value="loans" className="p-6">
        <div className="text-center py-12 text-text-secondary">
          No loan information available
        </div>
      </TabsContent>

      {/* Savings */}
      <TabsContent value="savings" className="p-6">
        <div className="text-center py-12 text-text-secondary">
          No savings information available
        </div>
      </TabsContent>

      {/* App and System */}
      <TabsContent value="app" className="p-6">
        <div className="text-center py-12 text-text-secondary">
          No app and system information available
        </div>
      </TabsContent>
    </Card>
  );
}
