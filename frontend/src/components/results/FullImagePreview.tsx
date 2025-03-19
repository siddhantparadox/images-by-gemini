import Image from 'next/image';

interface FullImagePreviewProps {
  src: string;
}

export const FullImagePreview = ({ src }: FullImagePreviewProps) => {
  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
      <Image 
        src={src} 
        alt="Edited" 
        fill
        className="object-contain"
      />
    </div>
  );
};
