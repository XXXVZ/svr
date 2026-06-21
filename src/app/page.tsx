'use client';
import { BookingExperience } from '@/components/BookingExperience/BookingExperience';

export default function Home() {
  return (
    <main className='mx-auto max-w-md p-4'>
      <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-sm sm:p-8'>
        <h1 className='mb-4 text-2xl font-semibold'>Бронирование столика</h1>
        <BookingExperience />
      </div>
    </main>
  );
}
