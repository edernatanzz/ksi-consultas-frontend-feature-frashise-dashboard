'use client'

import MetricsSection from '@/components/organisms/MetricsSection/MetricsSection';
import SalesEvolutionSection from '@/components/organisms/SalesEvolutionSection/SalesEvolutionSection';
import PartnerPerformanceSection from '@/components/organisms/PartnerPerformanceSection/PartnerPerformanceSection';
import ServiceDistributionSection from '@/components/organisms/ServiceDistributionSection/ServiceDistributionSection';
import QuickActionsSection from '@/components/organisms/QuickActionsSection/QuickActionsSection';
import RecentActivitySection from '@/components/organisms/RecentActivitySection/RecentActivitySection';

export default function FranchiseeMainPage() {
  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Sistema de Gerenciamento de Franqueados</p>
      </div>
      <MetricsSection />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SalesEvolutionSection className="col-span-2" />
        <PartnerPerformanceSection />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ServiceDistributionSection className="col-span-2" />
        <QuickActionsSection />
      </div>
      <RecentActivitySection />
    </div>
  );
}