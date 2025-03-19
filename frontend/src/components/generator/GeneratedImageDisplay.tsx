import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Button } from '../ui/button';

interface GeneratedImageDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
  downloadImage: () => void;
}

export const GeneratedImageDisplay = ({
  generatedImage,
  isLoading,
  downloadImage
}: GeneratedImageDisplayProps) => {
  return (
    <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Generated Image</h2>
      
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="text-center p-10">
            <LoadingSpinner 
              size="40" 
              text="Creating your masterpiece..." 
              subText="This may take up to 30 seconds" 
            />
          </div>
        ) : generatedImage ? (
          <div className="relative max-h-full w-full flex justify-center">
            <img 
              src={generatedImage} 
              alt="Generated image" 
              className="max-h-[400px] object-contain rounded shadow-lg"
            />
          </div>
        ) : (
          <div className="text-center p-10">
            <svg className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Your generated image will appear here</p>
          </div>
        )}
      </div>
      
      {generatedImage && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={downloadImage}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Image
          </Button>
        </div>
      )}
    </div>
  );
};
