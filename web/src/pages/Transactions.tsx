// src/pages/Transactions.tsx
import { Download } from 'lucide-react';
import { TransactionTablePlain } from '@/components/transactions/TransactionTable';
import { toast } from '@/components/ui/use-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Transactions() {
  const token = localStorage.getItem('token');

  const handleExport = async () => {
    if (!token) {
      toast({ title: 'Please log in first', variant: 'destructive' });
      return;
    }

    const res = await fetch(`${API}/api/v1/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fields: ['title', 'amount', 'date'],
        filters: { status: 'completed' },
      }),
    });

    if (!res.ok) {
      toast({ title: 'Export failed', variant: 'destructive' });
      return;
    }

    /* ----- download ----- */
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold"></h2>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-md bg-[#24282f] px-3 py-2 text-xs text-muted-foreground hover:bg-panel"
        >
          <Download className="size-4" />
          Export CSV
        </button>
      </div>

      <TransactionTablePlain />
    </div>
  );
}
