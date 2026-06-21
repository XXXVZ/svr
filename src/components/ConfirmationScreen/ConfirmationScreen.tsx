import type { BookingFormData } from '@/types/booking';

interface ConfirmationScreenProps {
  booking: BookingFormData;
  onReset: () => void;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ConfirmationScreen({
  booking,
  onReset,
}: ConfirmationScreenProps) {
  return (
    <section className='flex flex-col items-center gap-4 text-center animate-fadi-in'>
      <h2 className='text-xl font-semibold'>Столик забронирован</h2>

      <dl className='w-full max-w-xs text-left'>
        <Row label='Имя' value={booking.name} />
        <Row label='Дата' value={formatDate(booking.date)} />
        <Row label='Время' value={booking.time} />
        <Row label='Гостей' value={String(booking.guests)} />
      </dl>

      <button
        onClick={onReset}
        className='rounded-md bg-accent px-4 py-2 font-medium text-white'
      >
        Забронировать ещё
      </button>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between border-b border-gray-200 py-2'>
      <dt className='text-gray-500'>{label}</dt>
      <dd className='font-medium'>{value}</dd>
    </div>
  );
}
