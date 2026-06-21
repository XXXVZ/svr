export const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => `${12 + i}:00`);

const MAX_DAYS_AHEAD = 90;

const NAME_PATTERN = /^[\p{L}\s-]+$/u;

export function validateName(value: string): string | null {
  const name = value.trim();
  if (!name) return 'Введите имя';
  if (name.length < 2) return 'Имя должно содержать минимум 2 символа';
  if (!NAME_PATTERN.test(name)) return 'Только буквы, пробелы и дефис';

  return null;
}

export function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Введите номер телефона';
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8'))
    return null;

  return 'Введите корректный номер: +7 или 8 и 10 цифр';
}

export function validateDate(value: string): string | null {
  if (!value) return 'Укажите дату';

  const date = parseLocalDate(value);
  if (!date) return 'Некорректная дата';

  const today = startOfToday();
  if (date < today) return 'Дата должна быть сегодняшняя, или позже';

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + MAX_DAYS_AHEAD);
  if (date > maxDate)
    return `Дата должна быть не позднее ${MAX_DAYS_AHEAD} дней от сегодняшней`;

  return null;
}

export function validateTime(value: string): string | null {
  if (!value) return 'Выберите время';
  if (!TIME_SLOTS.includes(value)) return 'Выберите время из списка';

  return null;
}

export function validateGuests(value: number): string | null {
  if (Number.isNaN(value)) return 'Укажите количество гостей';
  if (!Number.isInteger(value)) return 'Количество гостей должно быть целым';
  if (value < 1 || value > 12) return 'Допустимо от 1 до 12 гостей';

  return null;
}

// парсинг в локальное, чтобы сравнение было без времени
function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// парсинг в локальную дату
function parseLocalDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isValid ? date : null;
}
