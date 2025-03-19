import { ImageUploader } from './ImageUploader';
import { PromptSelector } from './PromptSelector';
import { PromptInput } from './PromptInput';
import { ActionButtons } from './ActionButtons';
import { ProTips } from './ProTips';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { ResponseMessage } from '../ui/ResponseMessage';
import { RefObject } from 'react';

// Define only the props we need for this component
interface EditorPanelProps {
  file: File | null;
  prompt: string;
  originalImage: string | null;
  isLoading: boolean;
  error: string | null;
  responseText: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  availablePrompts: string[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  selectPresetPrompt: (prompt: string) => void;
  handlePromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetForm: () => void;
  processImage: (e: React.FormEvent) => void;
}

export const EditorPanel = ({
  file,
  prompt,
  originalImage,
  isLoading,
  error,
  responseText,
  fileInputRef,
  availablePrompts,
  handleFileChange,
  handleDragOver,
  handleDrop,
  selectPresetPrompt,
  handlePromptChange,
  resetForm,
  processImage
}: EditorPanelProps) => {

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Edit Image</h2>
          
          <form onSubmit={processImage}>
            {/* File Upload */}
            <ImageUploader 
              originalImage={originalImage}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
            
            {/* Preset prompts dropdown */}
            <PromptSelector 
              availablePrompts={availablePrompts}
              onSelectPrompt={selectPresetPrompt}
            />
            
            {/* Prompt textarea */}
            <PromptInput 
              value={prompt}
              onChange={handlePromptChange}
            />
            
            {/* Buttons */}
            <ActionButtons 
              isProcessing={isLoading}
              hasRequiredData={!!file && !!prompt}
              onSubmit={processImage}
              onReset={resetForm}
            />
          </form>
          
          {/* Messages */}
          {isLoading && <div className="mt-8"><LoadingSpinner /></div>}
          
          {error && <div className="mt-6"><ErrorMessage message={error} /></div>}
          
          {responseText && <div className="mt-6"><ResponseMessage text={responseText} /></div>}
          
          {/* Tips Section */}
          <ProTips />
        </div>
      </div>
    </div>
  );
};
