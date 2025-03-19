import { BeforeAfterComparison } from './BeforeAfterComparison';
import { FullImagePreview } from './FullImagePreview';
import { DownloadButton } from './DownloadButton';

// Define only the props we need for this component
interface ResultsPanelProps {
  originalImage: string | null;
  editedImage: string | null;
  isLoading: boolean;
  downloadImage: () => void;
}

export const ResultsPanel = ({
  originalImage,
  editedImage,
  isLoading,
  downloadImage
}: ResultsPanelProps) => {

  // Show results only when we have an edited image and we're not loading
  const showResults = editedImage && !isLoading;

  // Show empty state when we don't have results to display
  const showEmptyState = !showResults;

  return (
    <div className="lg:col-span-2">
      {showResults ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Transformed Image
            </h2>
            
            {/* Before & After Comparison */}
            {originalImage && editedImage && (
              <BeforeAfterComparison
                originalImage={originalImage}
                editedImage={editedImage}
              />
            )}
            
            {/* Full size edited image */}
            {editedImage && (
              <FullImagePreview src={editedImage} />
            )}
            
            {/* Download button */}
            <DownloadButton onClick={downloadImage} />
          </div>
        </div>
      ) : showEmptyState && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex items-center justify-center">
          <div className="text-center p-12">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-white mb-2">Transform Your Image</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Upload an image and provide editing instructions to see the AI-powered transformation here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
