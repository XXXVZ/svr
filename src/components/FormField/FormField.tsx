interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={htmlFor} className='text-sm font-medium'>
        {label}
      </label>
      {children}
      {error && (
        <p role='alert' className='text-sm text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
}
