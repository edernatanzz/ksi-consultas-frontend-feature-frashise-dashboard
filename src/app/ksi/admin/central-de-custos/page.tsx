'use client'

import React from 'react'
import { SetorLayout } from '@/components/template/SetorLayout/layout'
import { UserRole, Permission } from '@/types/auth'
import MetricOverview from '@/components/organisms/AdminOrganisms/Painel/MetricOverview/MetricOverview'
import { MetricCardProps } from '@/components/molecules/AdminMolecules/Painel/MetricCard/MetricCard'
import CostDistributionSection from '@/components/organisms/AdminOrganisms/Painel/CostDistributionSection/CostDistributionSection'
import CostEvolutionChartSection from '@/components/organisms/AdminOrganisms/Painel/ComponentGrafico'
import CostHeatmapSection from '@/components/organisms/AdminOrganisms/CentralDeCustos/CostHeatmapSection/CostHeatmapSection'
import ProviderComparisonSection from '@/components/organisms/AdminOrganisms/CentralDeCustos/ProviderComparisonSection/ProviderComparisonSection'
import ScenarioSimulatorSection from '@/components/organisms/AdminOrganisms/CentralDeCustos/ScenarioSimulatorSection/ScenarioSimulatorSection'

export default function CentralDeCustosPage() {
  const metricsData: MetricCardProps[] = [
    {
      title: 'Custo Total Mês Atual',
      value: 'R$ 15.500',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'attach_money',
    },
    {
      title: 'Economia Potencial',
      value: 'R$ 2.500',
      change: '-10.0%',
      changeType: 'negative',
      icon: 'savings',
    },
    {
      title: 'Custo Médio por Consulta',
      value: 'R$ 0.48',
      change: '+1.5%',
      changeType: 'positive',
      icon: 'receipt_long',
    },
    {
      title: 'Consultas Realizadas',
      value: '32.800',
      change: '+8.0%',
      changeType: 'positive',
      icon: 'search',
    },
  ];

  const costDistributionData = [
    { label: 'Consulta PF', value: 'R$ 5.425', percentage: '35%', color: '#e11d48' },
    { label: 'Consulta PJ', value: 'R$ 4.650', percentage: '30%', color: '#1e293b' },
    { label: 'Score/Rating', value: 'R$ 3.100', percentage: '20%', color: '#2563eb' },
    { label: 'Histórico', value: 'R$ 1.550', percentage: '10%', color: '#16a34a' },
    { label: 'Outros', value: 'R$ 775', percentage: '5%', color: '#ea580c' },
  ];

  const heatmapData = [
    { day: 'Dom', hourlyCosts: [
      { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }
    ]},
    { day: 'Seg', hourlyCosts: [
      { value: 80, colorClass: 'bg-orange-400' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }
    ]},
    { day: 'Ter', hourlyCosts: [
      { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }
    ]},
    { day: 'Qua', hourlyCosts: [
      { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }
    ]},
    { day: 'Qui', hourlyCosts: [
      { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }
    ]},
    { day: 'Sex', hourlyCosts: [
      { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }
    ]},
    { day: 'Sáb', hourlyCosts: [
      { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 60, colorClass: 'bg-green-400' }, { value: 70, colorClass: 'bg-yellow-300' }, { value: 80, colorClass: 'bg-orange-400' }, { value: 90, colorClass: 'bg-red-400' }, { value: 100, colorClass: 'bg-red-600' }, { value: 90, colorClass: 'bg-red-400' }, { value: 80, colorClass: 'bg-orange-400' }
    ]}
  ];

  const providerComparisonData = [
    { providerName: 'Serasa', actualCost: 4250, alternativeCost: 3800, difference: -450, economy: 450 },
    { providerName: 'SPC', actualCost: 3180, alternativeCost: 2950, difference: -230, economy: 230 },
    { providerName: 'Receita', actualCost: 2890, alternativeCost: 2890, difference: 0 },
    { providerName: 'Junta', actualCost: 1950, alternativeCost: 1650, difference: -300, economy: 300 },
  ];

  const scenarioSimulatorData = {
    scenarios: [
      { label: 'Cenário Atual', description: 'Custo mensal estimado', value: 12270, isHighlighted: true },
      { label: 'Otimizado', description: 'Custo mensal estimado', value: 10290, difference: -1980 },
      { label: 'Premium', description: 'Custo mensal estimado', value: 15840, difference: 3570 },
      { label: 'Econômico', description: 'Custo mensal estimado', value: 8950, difference: -3320 },
    ],
    projectedAnnualSavings: 23760,
  };

  return (
    <SetorLayout allowedRoles={[UserRole.ADMIN]} requiredPermissions={[Permission.READ_DASHBOARD]}>
      <div data-testid="central-de-custos-container" className="p-4 sm:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Central de Custos</h1>
          
          <MetricOverview metrics={metricsData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
            <CostDistributionSection data={costDistributionData} />
            <CostEvolutionChartSection
              title="Evolução vs Projeção"
            />
          </div>

          <CostHeatmapSection data={heatmapData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
            <ProviderComparisonSection data={providerComparisonData} />
            <ScenarioSimulatorSection 
              scenarios={scenarioSimulatorData.scenarios} 
              projectedAnnualSavings={scenarioSimulatorData.projectedAnnualSavings} 
            />
          </div>
        </div>
      </div>
    </SetorLayout>
  )
} 