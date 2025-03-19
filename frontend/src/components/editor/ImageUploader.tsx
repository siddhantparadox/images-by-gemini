import Image from 'next/image';
import { RefObject } from 'react';

interface ImageUploaderProps {
  originalImage: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
}

export const ImageUploader = ({
  originalImage,
  fileInputRef,
  handleFileChange,
  handleDragOver,
  handleDrop
}: ImageUploaderProps) => {
  return (
    <div 
      className="mb-6 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-900/20"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden"
      />
      {originalImage ? (
        <div className="relative w-full h-48 mb-2">
          <Image 
            src={originalImage} 
            alt="Original" 
            fill
            className="rounded-lg"
            style={{ objectFit: 'contain' }}
          />
        </div>
      ) : (
        <div className="py-10">
          <div className="bg-purple-100 dark:bg-purple-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-purple-500 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Upload an image or drag and drop</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
        </div>
      )}
    </div>
  );
};
