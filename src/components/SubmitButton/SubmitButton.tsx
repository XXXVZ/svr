import { Spinner } from '@/components/Spinner/Spinner';

interface SubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
}

export function SubmitButton({
  isLoading,
  children,
  loadingText,
}: SubmitButtonProps) {
  return (
    <button
      type='submit'
      disabled={isLoading}
      className='flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 font-medium text-white disabled:opacity-60'
    >
      {isLoading && <Spinner />}
      {isLoading ? loadingText : children}
    </button>
  );
}
