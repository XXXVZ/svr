'use client';
import { BookingForm } from '@/components/BookingForm/BookingForm';

export default function Home() {
  return (
    <main className='mx-auto max-w-md p-4'>
      <h1 className='mb-4 text-2xl font-semibold'>Бронирование столика</h1>
      <BookingForm status='idle' onSubmit={(data) => console.log(data)} />
    </main>
  );
}
