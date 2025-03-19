import { ErrorMessage } from '../ui/ErrorMessage';
import { ResponseMessage } from '../ui/ResponseMessage';
import { PromptSuggestions } from './PromptSuggestions';
import { ProTips } from '../editor/ProTips';
import { TailSpin } from 'react-loader-spinner';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface GeneratorPanelProps {
  prompt: string;
  isLoading: boolean;
  error: string | null;
  responseText: string | null;
  promptSuggestions: string[];
  handlePromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectPromptSuggestion: (prompt: string) => void;
  resetForm: () => void;
  generateImage: (e: React.FormEvent) => Promise<void>;
}

export const GeneratorPanel = ({
  prompt,
  isLoading,
  error,
  responseText,
  promptSuggestions,
  handlePromptChange,
  selectPromptSuggestion,
  resetForm,
  generateImage
}: GeneratorPanelProps) => {
  return (
    <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Generate an Image from Text</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Enter a detailed description of the image you want to create
        </p>
      </div>

      <form onSubmit={generateImage} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Image Description
          </label>
          <Textarea
            id="prompt"
            className="min-h-[120px]"
            placeholder="Describe the image you want to create in detail..."
            value={prompt}
            onChange={handlePromptChange}
          />
        </div>

        <PromptSuggestions 
          suggestions={promptSuggestions} 
          onSelect={selectPromptSuggestion} 
        />

        <div className="flex space-x-3">
          <Button
            type="submit"
            disabled={isLoading || !prompt}
            variant="default"
            className="flex-grow bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            {isLoading ? (
              <div className="flex items-center justify-center w-full">
                <TailSpin height="24" width="24" color="#FFFFFF" ariaLabel="loading" />
                <span className="ml-2">Generating...</span>
              </div>
            ) : 'Generate Image'}
          </Button>
          
          <Button
            type="button"
            onClick={resetForm}
            variant="outline"
            size="icon"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </Button>
        </div>
      </form>

      {error && <ErrorMessage message={error} />}
      {responseText && <ResponseMessage text={responseText} />}

      <div className="mt-6">
        <ProTips />
      </div>
    </div>
  );
};
