'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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

  return (
    <AnimatePresence mode='wait'>
      {status === 'success' && booking ? (
        <motion.div
          key='confirmation'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <ConfirmationScreen booking={booking} onReset={handleReset} />
        </motion.div>
      ) : (
        <motion.div
          key='form'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <BookingForm status={status} onSubmit={handleSubmit} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
