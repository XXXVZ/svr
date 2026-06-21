'use client';

import { useForm } from 'react-hook-form';
import type { BookingFormData, BookingStatus } from '@/types/booking';
import {
  TIME_SLOTS,
  validateName,
  validatePhone,
  validateDate,
  validateTime,
  validateGuests,
} from '@/utils/validations';
import { FormField } from '../FormField/FormField';
import { Spinner } from '../Spinner/Spinner';

interface BookingFormProps {
  status: BookingStatus;
  onSubmit: (data: BookingFormData) => void;
}

function inputClass(hasError: boolean) {
  return [
    'rounded-md border px-3 py-2 outline-none',
    'focus:border-accent',
    hasError ? 'border-red-500' : 'border-gray-300',
  ].join(' ');
}

export function BookingForm({ status, onSubmit }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    mode: 'onBlur',
    defaultValues: { name: '', phone: '', date: '', time: '', guests: 2 },
  });

  const isLoading = status === 'loading';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='flex flex-col gap-4'
    >
      <FormField label='Имя гостя' htmlFor='name' error={errors.name?.message}>
        <input
          id='name'
          type='text'
          className={inputClass(!!errors.name)}
          {...register('name', { validate: (v) => validateName(v) ?? true })}
        />
      </FormField>

      <FormField label='Телефон' htmlFor='phone' error={errors.phone?.message}>
        <input
          id='phone'
          type='tel'
          placeholder='+7 999 123-45-67'
          className={inputClass(!!errors.phone)}
          {...register('phone', { validate: (v) => validatePhone(v) ?? true })}
        />
      </FormField>

      <FormField label='Дата' htmlFor='date' error={errors.date?.message}>
        <input
          id='date'
          type='date'
          className={inputClass(!!errors.date)}
          {...register('date', { validate: (v) => validateDate(v) ?? true })}
        />
      </FormField>

      <FormField label='Время' htmlFor='time' error={errors.time?.message}>
        <select
          id='time'
          className={inputClass(!!errors.time)}
          {...register('time', { validate: (v) => validateTime(v) ?? true })}
        >
          <option value=''>Выберите время</option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label='Количество гостей'
        htmlFor='guests'
        error={errors.guests?.message}
      >
        <input
          id='guests'
          type='number'
          min={1}
          max={12}
          className={inputClass(!!errors.guests)}
          {...register('guests', {
            valueAsNumber: true,
            validate: (v) => validateGuests(v) ?? true,
          })}
        />
      </FormField>

      <button
        type='submit'
        disabled={isLoading}
        className='flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 font-medium text-white disabled:opacity-60'
      >
        {isLoading && <Spinner />}
        {isLoading ? 'Бронирую…' : 'Забронировать'}
      </button>
    </form>
  );
}
