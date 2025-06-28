import { Card, CardContent } from '@/components/ui/card';

interface Props {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export function KpiCard({ label, value, icon }: Props) {
  return (
    <Card className="bg-card border border-panel rounded-xl">
      <CardContent className="flex items-center gap-5 px-6 py-4">
        {/* icon bubble */}
        <div className="p-3 rounded-xl" style={{ backgroundColor: '#282c35' }}>
          <span className="text-accentGreen">{icon}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-xl md:text-2xl font-semibold tracking-tight">
            {typeof value === 'number'
              ? Number(value).toLocaleString()
              : value}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
