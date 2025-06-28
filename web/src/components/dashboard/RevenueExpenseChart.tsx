import { useSummary } from '@/hooks/useDashboard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function RevenueExpenseChart() {
  const { data = [], isLoading } = useSummary();
  if (isLoading) return <div className="h-64">Loading…</div>;

  const months = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec',
  ];
  const chartData = data.map((d: any) => ({
    name: months[d._id.month - 1],
    income: d.income,
    expense: d.expense,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Line type="monotone" dataKey="income" stroke="#16a34a" />
        <Line type="monotone" dataKey="expense" stroke="#f59e0b" />
      </LineChart>
    </ResponsiveContainer>
  );
}
