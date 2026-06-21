'use client';

import { useState } from 'react';
import type { BookingFormData, BookingStatus } from '@/types/booking';
import { BookingForm } from '../BookingForm/BookingForm';
import { ConfirmationScreen } from '../ConfirmationScreen/ConfirmationScreen';

export function BookingExperience() {
  const [status, setStatus] = useState<BookingStatus>('idle');
  const [booking, setBooking] = useState<BookingFormData | null>(null);

  async function handleSubmit(data: BookingFormData) {
    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setBooking(data);
    setStatus('success');
  }

  function handleReset() {
    setBooking(null);
    setStatus('idle');
  }

  if (status === 'success' && booking) {
    return <ConfirmationScreen booking={booking} onReset={handleReset} />;
  }

  return <BookingForm status={status} onSubmit={handleSubmit} />;
}
