import { Button } from '../ui/button';

interface DownloadButtonProps {
  onClick: () => void;
}

export const DownloadButton = ({ onClick }: DownloadButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>Download Edited Image</span>
    </Button>
  );
};
