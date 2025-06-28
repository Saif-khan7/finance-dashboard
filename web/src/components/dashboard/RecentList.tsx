import { useQuery } from '@tanstack/react-query';
import { listTx } from '@/api/transactions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Tx {
  _id: string;
  amount: number;
  type: 'income' | 'expense';
  user_id: string;
  user_profile: string;
}

export default function RecentList() {
  const { data = { data: [] as Tx[] }, isLoading } = useQuery({
    queryKey: ['recentTx'],
    queryFn: () => listTx({ limit: 3, sort: '-date' }),
  });

  return (
    <Card className="bg-card w-[260px] border-none rounded-xl">
      {/* heading and link on SAME row */}
      <CardHeader className="flex flex-row items-center justify-between px-5 pt-4 pb-3">
        <h3 className="text-sm font-semibold">Recent Transaction</h3>
        <a href="/transactions" className="text-xs text-accentGreen hover:underline">
          See all
        </a>
      </CardHeader>

      <CardContent className="divide-y divide-border/40 px-5 pb-4">
        {isLoading && <p className="text-muted-foreground text-sm py-4">Loading…</p>}

        {data.data.map((tx: Tx) => {
          const isIncome = tx.type === 'income';
          return (
            <div key={tx._id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              {/* avatar + label */}
              <div className="flex items-center gap-3 min-w-0">
                <img src={tx.user_profile} alt={tx.user_id} className="h-8 w-8 rounded-full object-cover" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] text-muted-foreground">
                    {isIncome ? 'Transfers from' : 'Transfers to'}
                  </span>
                  <span className="truncate text-xs">{tx.user_id}</span>
                </div>
              </div>

              {/* amount pill */}
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${
                  isIncome ? 'bg-accentGreen/15 text-accentGreen' : 'bg-warn/15 text-warn'
                }`}
              >
                {isIncome ? `+$${tx.amount}` : `-$${tx.amount}`}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
