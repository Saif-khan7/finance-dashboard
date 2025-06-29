import { useSummary } from '@/hooks/useDashboard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type SummaryPoint = { _id: { month: number }; income: number; expense: number };

export default function CategoryBreakdownChart() {
  const { data = [] } = useSummary();

  /* map -> 12 months */
  const chartData = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec',
  ].map((label, i) => {
    const p = (data as SummaryPoint[]).find((d) => d._id.month === i + 1);
    return { name: label, income: p?.income ?? 0, expense: p?.expense ?? 0 };
  });

  return (
    <div className="h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#32363e" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false}
                 tick={{ fontSize: 10, fill: '#8A8F9B' }} />
          <YAxis width={42} axisLine={false} tickLine={false}
                 tick={{ fontSize: 10, fill: '#8A8F9B' }}
                 tickFormatter={(v:number)=>v.toLocaleString()} />
          <Tooltip
            cursor={{ stroke:'#555', strokeDasharray:'4 4' }}
            contentStyle={{ background:'#1b1e27', border:'none', fontSize:12 }}
            labelStyle={{ color:'#8A8F9B' }}
            formatter={(v:number, k)=>[`$${v.toLocaleString()}`, k]}
          />
          <Bar dataKey="income"  stackId="a" fill="#00d26a" radius={[4,4,0,0]} />
          <Bar dataKey="expense" stackId="a" fill="#f4b018" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
