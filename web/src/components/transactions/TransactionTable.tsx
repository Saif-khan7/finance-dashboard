import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { format, isAfter } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Calendar as CalendarIcon, ArrowUpAz, ArrowDownZa } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { StatusBadge } from './StatusBadge';
import { listTxPaginated } from '@/api/transactions';

interface TxRow {
  _id: string;
  type: 'income' | 'expense';
  user_name?: string;
  user_id: string;
  user_profile: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending';
}

const STRIP = '#282c35';

/* ------------------------------------------------------------------ */
/* Toolbar (search + date)                                            */
/* ------------------------------------------------------------------ */
function Toolbar({
  search,
  setSearch,
  range,
  setRange,
  calendarOpen,
  setCalendarOpen,
}: {
  search: string;
  setSearch: (v: string) => void;
  range?: DateRange;
  setRange: (r: DateRange | undefined) => void;
  calendarOpen: boolean;
  setCalendarOpen: (v: boolean) => void;
}) {
  return (
    <div className="flex justify-center gap-6 flex-wrap">
      {/* search pill */}
      <div className="relative w-80">
        <Input
          placeholder="Search for anything..."
          className="h-9 rounded-full bg-[#282c35] border-none pl-4 pr-10 text-sm focus-visible:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute right-4 top-2.5 size-4 text-muted-foreground" />
      </div>

      {/* date trigger */}
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="size-4" />
            {range?.from && range?.to
              ? `${format(range.from, 'dd MMM')} – ${format(range.to, 'dd MMM')}`
              : 'Date'}
          </button>
        </PopoverTrigger>

        <PopoverContent className="p-0 bg-card border-border">
          <Calendar
            mode="range"
            selected={range}
            numberOfMonths={2}
            defaultMonth={range?.from}
            onSelect={(r) => {
              // always update local state
              setRange(r);

              // Close & refetch only when a complete range exists
              if (r?.from && r?.to && isAfter(r.to, r.from)) {
                setCalendarOpen(false);
              }
              // Click the same day twice to clear range
              if (!r?.from && !r?.to) {
                setCalendarOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Core table                                                         */
/* ------------------------------------------------------------------ */
function TableCore({ showTitle = true }: { showTitle?: boolean }) {
  const [page, setPage]   = useState(1);
  const [search, setSearch] = useState('');
  const [range, setRange] = useState<DateRange>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'date', desc: true }]);

  const sortParam = useMemo(() => {
    const s = sorting[0];
    return s ? (s.desc ? `-${s.id}` : s.id) : undefined;
  }, [sorting]);

  const {
    data = { data: [] as TxRow[], total: 0 },
    isLoading,
  } = useQuery({
    queryKey: ['tx', page, search, range, sortParam],
    queryFn: () =>
      listTxPaginated({
        page,
        limit: 10,
        search: search || undefined,
        start: range?.from?.toISOString(),
        end: range?.to?.toISOString(),
        sort: sortParam,
      }),
    staleTime: 30_000,
    placeholderData: (p) => p,
  });

  /* columns */
  const columns: ColumnDef<TxRow>[] = [
    {
      accessorKey: 'user_name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3 pl-3">
          <img
            src={`${row.original.user_profile}?id=${row.original._id}`}
            onError={(e) => (e.currentTarget.src = '/placeholder.png')}
            className="h-8 w-8 rounded-md object-cover"
          />
          {row.original.user_name || row.original.user_id}
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: () => (
        <button className="flex items-center gap-1">
          Date&nbsp;
          {sorting[0]?.desc === false ? (
            <ArrowUpAz className="size-3" />
          ) : (
            <ArrowDownZa className="size-3" />
          )}
        </button>
      ),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'EEE, dd MMM yyyy'),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const val = row.original.amount;
        const cls =
          row.original.type === 'income' ? 'text-accentGreen' : 'text-warn';
        return <span className={`${cls} font-medium`}>{row.original.type === 'income' ? `+$${val}` : `-$${Math.abs(val)}`}</span>;
      },
    },
    { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => <StatusBadge status={getValue<any>()} /> },
  ];

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(data.total / 10),
    state: { sorting },
    onSortingChange: (up) => {
      const next = typeof up === 'function' ? up(sorting) : up;
      setSorting(next.slice(0, 1));
      setPage(1);
    },
  });

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-card rounded-xl p-6 space-y-6">
      {showTitle && <h2 className="text-lg font-semibold">Transactions</h2>}

      {/* toolbar always rendered */}
      <Toolbar
        search={search}
        setSearch={(v) => { setSearch(v); setPage(1); }}
        range={range}
        setRange={(r) => { setRange(r); setPage(1); }}
        calendarOpen={calendarOpen}
        setCalendarOpen={setCalendarOpen}
      />

      {/* table */}
      <div className="overflow-hidden rounded-md">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: STRIP }}>
              {table.getHeaderGroups()[0].headers.map((h, i, arr) => (
                <th
                  key={h.id}
                  className={`py-3 px-3 text-left font-medium text-muted-foreground cursor-pointer select-none
                    ${i === 0 ? 'rounded-l-md' : ''}
                    ${i === arr.length - 1 ? 'rounded-r-md' : ''}`}
                  onClick={h.column.getToggleSortingHandler()}
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-muted-foreground">Loading…</td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} style={{ borderBottom: `1px solid ${STRIP}` }}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-end gap-4 pt-3">
        <button className="text-xs disabled:text-muted-foreground" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <button className="text-xs disabled:text-muted-foreground" disabled={page * 10 >= data.total} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Wrappers                                                           */
/* ------------------------------------------------------------------ */
export default function TransactionTableCard() {
  return <TableCore showTitle />;
}

export function TransactionTablePlain() {
  return <TableCore showTitle={false} />;
}
