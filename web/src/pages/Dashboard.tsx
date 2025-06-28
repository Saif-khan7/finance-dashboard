import {
  Wallet,
  CreditCard,
  Currency,
  PiggyBank,
} from 'lucide-react';

import { useSummary } from '@/hooks/useDashboard';
import { KpiCard } from '@/components/dashboard/KpiCard';
import RevenueExpenseChart from '@/components/dashboard/RevenueExpenseChart';
import RecentList from '@/components/dashboard/RecentList';
import TransactionTable from '@/components/transactions/TransactionTable';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Dashboard() {
  /* ----------- DATA AGGREGATION ---------- */
  const { data = [] } = useSummary();
  const incomeSum  = data.reduce((a: number, d: any) => a + d.income,  0);
  const expenseSum = data.reduce((a: number, d: any) => a + d.expense, 0);
  const balance    = incomeSum - expenseSum;
  const savings    = balance * 0.2; // demo calc 20 %

  /* ----------- RENDER ---------- */
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Revenue"  value={`$${incomeSum.toLocaleString()}`}  icon={<CreditCard size={20} />} />
        <KpiCard label="Expenses" value={`$${expenseSum.toLocaleString()}`} icon={<Currency   size={20} />} />
        <KpiCard label="Balance"  value={`$${balance.toLocaleString()}`}    icon={<Wallet     size={20} />} />
        <KpiCard label="Savings"  value={`$${savings.toLocaleString()}`}    icon={<PiggyBank  size={20} />} />
      </div>

      {/* CHART + RECENT LIST  */}
      <div className="grid lg:grid-cols-[1fr_250px] gap-4">
        {/* Overview Card */}
        <div className="bg-card p-5 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-semibold">Overview</h3>

            {/* Legend + timeframe */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="inline-block size-2 rounded-full bg-accentGreen" />
                Income
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block size-2 rounded-full bg-warn" />
                Expenses
              </span>
              <Select defaultValue="monthly">
                <SelectTrigger className="h-7 w-[90px] bg-panel border border-border px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <RevenueExpenseChart />
        </div>

        {/* Recent transactions panel */}
        <RecentList />
      </div>
      <TransactionTable />
    </div>
  );
}
