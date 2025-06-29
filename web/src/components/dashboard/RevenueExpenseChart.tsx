import { useSummary } from '@/hooks/useDashboard';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

type SummaryPoint = { _id: { month: number }; income: number; expense: number };

export default function RevenueExpenseChart() {
  const { data = [] } = useSummary();

  const chartData = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',
  ].map((label, i) => {
    const p = (data as SummaryPoint[]).find((d) => d._id.month === i + 1);
    return { name: label, income: p?.income ?? 0, expense: p?.expense ?? 0 };
  });

  return (
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#32363e" strokeDasharray="3 5" vertical={false} />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#8A8F9B' }}
          />
          <YAxis
            width={42}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#8A8F9B' }}
            tickFormatter={(v: number) => v.toLocaleString()}
          />

          <Tooltip
            cursor={{ stroke: '#555', strokeWidth: 1, strokeDasharray: '4 4' }}
            content={({ active, payload }) =>
              active && payload?.length ? (
                <div className="rounded-md bg-accent p-2 text-xs space-y-1">
                  <p className="text-warn">expense : {payload[1]?.value}</p>
                  <p className="text-accentGreen">income : {payload[0]?.value}</p>
                </div>
              ) : null
            }
          />

          <Line dataKey="income" stroke="#00d26a" strokeWidth={2}
            dot={{ r: 4, fill: '#24282f', stroke: '#00d26a', strokeWidth: 2 }}
            activeDot={{ r: 6 }} type="monotone" />
          <Line dataKey="expense" stroke="#f4b018" strokeWidth={2}
            dot={{ r: 4, fill: '#24282f', stroke: '#f4b018', strokeWidth: 2 }}
            activeDot={{ r: 6 }} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
