import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  validateName,
  validatePhone,
  validateTime,
  validateGuests,
  validateDate,
} from './validations';

describe('validateName', () => {
  it('пропускает корректное имя', () => {
    expect(validateName('Анна')).toBeNull();
    expect(validateName('Анна-Мария')).toBeNull();
    expect(validateName('John Doe')).toBeNull();
  });

  it('отклоняет пустое и слишком короткое', () => {
    expect(validateName('')).not.toBeNull();
    expect(validateName('   ')).not.toBeNull();
    expect(validateName('A')).not.toBeNull();
  });

  it('отклоняет цифры и спецсимволы', () => {
    expect(validateName('Анна123')).not.toBeNull();
    expect(validateName('John_Doe')).not.toBeNull();
  });
});

describe('validatePhone', () => {
  it('принимает +7 и 8 форматы', () => {
    expect(validatePhone('+79991234567')).toBeNull();
    expect(validatePhone('89991234567')).toBeNull();
  });

  it('нормализует скобки, пробелы, дефисы', () => {
    expect(validatePhone('+7 (999) 123-45-67')).toBeNull();
  });

  it('отклоняет неверную длину и пустое', () => {
    expect(validatePhone('')).not.toBeNull();
    expect(validatePhone('+7999')).not.toBeNull();
    expect(validatePhone('123456789012')).not.toBeNull();
  });
});

describe('validateTime', () => {
  it('принимает слот из списка', () => {
    expect(validateTime('12:00')).toBeNull();
    expect(validateTime('22:00')).toBeNull();
  });
  it('отклоняет слот не из списка и пустое', () => {
    expect(validateTime('')).not.toBeNull();
    expect(validateTime('11:00')).not.toBeNull();
    expect(validateTime('12:30')).not.toBeNull();
  });
});

describe('validateGuests', () => {
  it('принимает границы 1 и 12', () => {
    expect(validateGuests(1)).toBeNull();
    expect(validateGuests(12)).toBeNull();
  });
  it('отклоняет вне диапазона, дробное и NaN', () => {
    expect(validateGuests(0)).not.toBeNull();
    expect(validateGuests(13)).not.toBeNull();
    expect(validateGuests(2.5)).not.toBeNull();
    expect(validateGuests(NaN)).not.toBeNull();
  });
});

describe('validateDate', () => {
  // Фикс. сегодня, чтобы тесты не висели
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-21T10:00:00'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('принимает сегодня и дату в пределах 90 дней', () => {
    expect(validateDate('2026-06-21')).toBeNull();
    expect(validateDate('2026-09-19')).toBeNull();
  });

  it('отклоняет прошлое, далёкое будущее и мусор', () => {
    expect(validateDate('2026-06-20')).not.toBeNull();
    expect(validateDate('2026-09-20')).not.toBeNull();
    expect(validateDate('')).not.toBeNull();
    expect(validateDate('2026-02-31')).not.toBeNull();
  });
});
