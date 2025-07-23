
export interface ChartDataItem {
    month: string
    serasa: number
    spc: number
    receita: number
  }
  
  export interface LegendItem {
    label: string
    color: string
    value?: string
  }
  
  export const chartData: ChartDataItem[] = [
    { month: 'Jan', serasa: 3200, spc: 2800, receita: 2000 },
    { month: 'Fev', serasa: 2900, spc: 2600, receita: 1800 },
    { month: 'Mar', serasa: 3500, spc: 3200, receita: 2400 },
    { month: 'Abr', serasa: 3100, spc: 2900, receita: 2100 },
    { month: 'Mai', serasa: 3300, spc: 3100, receita: 2200 },
    { month: 'Jun', serasa: 3000, spc: 2800, receita: 2000 }
  ]
  
  export const legendData: LegendItem[] = [
    { label: 'Serasa', color: '#EF4444' },
    { label: 'SPC', color: '#3B82F6' },
    { label: 'Receita', color: '#10B981' }
  ]
  
  export const calculateTotals = (data: ChartDataItem[]) => {
    const totals = data.reduce(
      (acc, item) => ({
        serasa: acc.serasa + item.serasa,
        spc: acc.spc + item.spc,
        receita: acc.receita + item.receita,
        total: acc.total + item.serasa + item.spc + item.receita
      }),
      { serasa: 0, spc: 0, receita: 0, total: 0 }
    )
  
    return {
      ...totals,
      serasaPercentage: ((totals.serasa / totals.total) * 100).toFixed(1),
      spcPercentage: ((totals.spc / totals.total) * 100).toFixed(1),
      receitaPercentage: ((totals.receita / totals.total) * 100).toFixed(1)
    }
  }
  
  export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  export const generateRandomData = (months: string[]): ChartDataItem[] => {
    return months.map(month => ({
      month,
      serasa: Math.floor(Math.random() * 2000) + 2000,
      spc: Math.floor(Math.random() * 1500) + 2500,
      receita: Math.floor(Math.random() * 1000) + 1500
    }))
  }
  
  export const chartDataLastYear: ChartDataItem[] = [
    { month: 'Jan', serasa: 2800, spc: 2400, receita: 1800 },
    { month: 'Fev', serasa: 2600, spc: 2300, receita: 1600 },
    { month: 'Mar', serasa: 3100, spc: 2900, receita: 2200 },
    { month: 'Abr', serasa: 2900, spc: 2700, receita: 1900 },
    { month: 'Mai', serasa: 3000, spc: 2800, receita: 2000 },
    { month: 'Jun', serasa: 2800, spc: 2600, receita: 1800 }
  ]
  
  export const chartDataQuarterly: ChartDataItem[] = [
    { month: 'Q1', serasa: 9600, spc: 8600, receita: 6200 },
    { month: 'Q2', serasa: 9400, spc: 8800, receita: 6300 },
    { month: 'Q3', serasa: 9200, spc: 8400, receita: 6000 },
    { month: 'Q4', serasa: 9800, spc: 9000, receita: 6500 }
  ]