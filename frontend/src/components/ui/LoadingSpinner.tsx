import { TailSpin } from 'react-loader-spinner';

interface LoadingSpinnerProps {
  size?: string;
  color?: string;
  text?: string;
  subText?: string;
}

export const LoadingSpinner = ({
  size = "40",
  color = "#8B5CF6",
  text = "Processing your image with AI...",
  subText = "This may take up to 30 seconds"
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
      <TailSpin
        height={size}
        width={size}
        color={color}
        ariaLabel="loading"
      />
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 font-medium">{text}</p>
      {subText && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subText}</p>}
    </div>
  );
};
