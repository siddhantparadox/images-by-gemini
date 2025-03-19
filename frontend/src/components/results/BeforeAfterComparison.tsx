import Image from 'next/image';

interface BeforeAfterComparisonProps {
  originalImage: string;
  editedImage: string;
}

export const BeforeAfterComparison = ({
  originalImage,
  editedImage
}: BeforeAfterComparisonProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-700 p-1 rounded-xl">
      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
        <p className="text-xs font-semibold text-center mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-widest">Before</p>
        <div className="relative w-full h-64 rounded-md overflow-hidden">
          <Image 
            src={originalImage} 
            alt="Original" 
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
        <p className="text-xs font-semibold text-center mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-widest">After</p>
        <div className="relative w-full h-64 rounded-md overflow-hidden">
          <Image 
            src={editedImage} 
            alt="Edited" 
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};
