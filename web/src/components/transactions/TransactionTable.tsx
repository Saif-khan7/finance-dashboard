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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Search,
  Calendar as CalendarIcon,
  ArrowUpAz,
  ArrowDownZa,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { StatusBadge } from './StatusBadge';
import { listTxPaginated } from '@/api/transactions';

/* ---------- row shape ---------- */
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

export default function TransactionTable() {
  /* state */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [range, setRange] = useState<DateRange>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);

  /* server sort param */
  const sortParam = useMemo(() => {
    if (!sorting.length) return undefined;
    const { id, desc } = sorting[0];
    return desc ? `-${id}` : id;
  }, [sorting]);

  /* query */
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
    placeholderData: (prev) => prev,
  });

  /* columns */
  const columns: ColumnDef<TxRow>[] = [
    {
      accessorKey: 'user_name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3 pl-2">
          <img
            src={`${row.original.user_profile}?id=${row.original._id}`}
            onError={(e) => (e.currentTarget.src = '/placeholder.png')}
            className="h-6 w-6 rounded-full object-cover"
          />
          {row.original.user_name || row.original.user_id}
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: () => {
        const dir = sorting[0]?.desc === false ? 'asc' : 'desc';
        return (
          <button className="flex items-center gap-1">
            Date {dir === 'asc' ? <ArrowUpAz className="size-3" /> : <ArrowDownZa className="size-3" />}
          </button>
        );
      },
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'EEE, dd MMM yyyy'),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const val = row.original.amount;
        const cls = row.original.type === 'income' ? 'text-accentGreen' : 'text-warn';
        return <span className={`${cls} font-medium`}>{row.original.type === 'income' ? `+$${val}` : `-$${Math.abs(val)}`}</span>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => <StatusBadge status={getValue<any>()} />,
    },
  ];

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(data.total / 10),
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(next.slice(0, 1)); // single-column sort
      setPage(1);
    },
  });

  /* ------------------------------------------------------------------ */
  return (
    <div className="bg-card rounded-xl p-5 space-y-4">
      <h2 className="text-lg font-semibold">Transactions</h2>

      {/* filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* search */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search for anything..."
            className="h-8 pl-10 bg-panel border border-border focus-visible:ring-0 text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* date-range */}
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 text-sm bg-panel px-3 py-1.5 rounded-md border border-border">
              <CalendarIcon className="size-4" />
              {range?.from && range?.to
                ? `${format(range.from, 'dd MMM')} – ${format(range.to, 'dd MMM')}`
                : 'Pick range'}
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
                // when both dates picked, close popover & refetch
                if (r?.from && r?.to && isAfter(r.to, r.from)) {
                  setCalendarOpen(false);
                  setPage(1);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* table */}
      <table className="w-full text-sm">
        <thead className="bg-panel">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className="py-2 px-3 text-left font-normal cursor-pointer select-none whitespace-nowrap"
                  onClick={h.column.getToggleSortingHandler()}
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="py-6 text-center text-muted-foreground">
                Loading…
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-border/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* pagination */}
      <div className="flex justify-end gap-4 pt-2">
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
