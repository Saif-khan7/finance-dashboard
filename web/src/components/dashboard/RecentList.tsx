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
  /* fetch the 5 most-recent rows */
  const { data = { data: [] as Tx[] }, isLoading } = useQuery({
    queryKey: ['recentTx', 5],
    queryFn : () => listTx({ limit: 5, sort: '-date' }),
  });

  return (
    <Card className="bg-card w-[260px] border-none rounded-xl">
      {/* heading row */}
      <CardHeader className="flex flex-row items-center justify-between px-5 pt-4 pb-2">
        <h3 className="text-base font-semibold">Recent Transaction</h3>
        <a href="/transactions" className="text-xs text-accentGreen">
          See all
        </a>
      </CardHeader>

      {/* list */}
      <CardContent className="mt-2 px-5 space-y-4 divide-y divide-[#282c35]">
        {isLoading ? (
          <p className="text-muted-foreground text-sm py-4">Loading…</p>
        ) : (
          data.data.map((tx: Tx, idx: number) => {
            const isIncome = tx.type === 'income';
            return (
              <div
                key={tx._id}
                className={`flex items-center justify-between ${idx > 0 ? 'pt-4' : ''}`}
              >
                {/* avatar + label */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={tx.user_profile}
                    alt={tx.user_id}
                    className="h-8 w-8 rounded-md object-cover"
                  />
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
                    isIncome
                      ? 'bg-accentGreen/15 text-accentGreen'
                      : 'bg-warn/15 text-warn'
                  }`}
                >
                  {isIncome ? `+$${tx.amount}` : `-$${tx.amount}`}
                </span>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
