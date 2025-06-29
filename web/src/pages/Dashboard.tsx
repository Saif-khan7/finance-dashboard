import { useState } from 'react';
import {
  Wallet, CreditCard, Currency, PiggyBank,
} from 'lucide-react';

import { useSummary } from '@/hooks/useDashboard';
import { KpiCard } from '@/components/dashboard/KpiCard';
import RevenueExpenseChart from '@/components/dashboard/RevenueExpenseChart';
import CategoryBreakdownChart from '@/components/dashboard/CategoryBreakdownChart';
import RecentList from '@/components/dashboard/RecentList';
import TransactionTableCard from '@/components/transactions/TransactionTable';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Dashboard() {
  /* aggregates for KPI */
  const { data = [] } = useSummary();
  const incomeSum  = data.reduce((a: number, d: any) => a + d.income,  0);
  const expenseSum = data.reduce((a: number, d: any) => a + d.expense, 0);
  const balance    = incomeSum - expenseSum;
  const savings    = balance * 0.2;

  /* chart type state */
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* KPI tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Revenue"  value={`$${incomeSum.toLocaleString()}`}  icon={<CreditCard size={20} />} />
        <KpiCard label="Expenses" value={`$${expenseSum.toLocaleString()}`} icon={<Currency   size={20} />} />
        <KpiCard label="Balance"  value={`$${balance.toLocaleString()}`}    icon={<Wallet     size={20} />} />
        <KpiCard label="Savings"  value={`$${savings.toLocaleString()}`}    icon={<PiggyBank  size={20} />} />
      </div>

      {/* chart + recent */}
      <div className="grid lg:grid-cols-[1fr_250px] gap-4">
        <div className="bg-card rounded-xl p-5 space-y-8">
          {/* card header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-semibold">Overview</h3>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-accentGreen" /> Income
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-warn" /> Expenses
              </span>

              {/* timeframe dropdown */}
              <Select defaultValue="monthly">
                <SelectTrigger
                  className="h-7 w-[90px] rounded-md bg-[#24282f] border-none text-[#8A8F9B] px-2 focus:outline-none"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#24282f] border border-[#4C4F57]">
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>

              {/* chart-type dropdown */}
              <Select value={chartType} onValueChange={(v) => setChartType(v as any)}>
                <SelectTrigger
                  className="h-7 w-[80px] rounded-md bg-[#24282f] border-none text-[#8A8F9B] px-2 focus:outline-none"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#24282f] border border-[#4C4F57]">
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="bar">Bars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* chart body */}
          {chartType === 'line' ? <RevenueExpenseChart /> : <CategoryBreakdownChart />}
        </div>

        <RecentList />
      </div>

      <TransactionTableCard />
    </div>
  );
}
