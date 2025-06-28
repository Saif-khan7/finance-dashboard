interface Props {
  status: 'completed' | 'pending';
}
export function StatusBadge({ status }: Props) {
  const cls =
    status === 'completed'
      ? 'bg-accentGreen/20 text-accentGreen'
      : 'bg-warn/20 text-warn';
  return (
    <span className={`px-3 py-0.5 rounded-full text-[11px] capitalize ${cls}`}>
      {status}
    </span>
  );
}
