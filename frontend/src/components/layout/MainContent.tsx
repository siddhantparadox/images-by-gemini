import { EditorPanel } from '../editor/EditorPanel';
import { ResultsPanel } from '../results/ResultsPanel';
import { useImageEditor } from '@/hooks/useImageEditor';

export const MainContent = () => {
  // Create a single instance of the hook to share state between components
  const {
    file,
    prompt,
    originalImage,
    editedImage,
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
    processImage,
    downloadImage
  } = useImageEditor();
  
  return (
    <main className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EditorPanel 
          file={file}
          prompt={prompt}
          originalImage={originalImage}
          isLoading={isLoading}
          error={error}
          responseText={responseText}
          fileInputRef={fileInputRef}
          availablePrompts={availablePrompts}
          handleFileChange={handleFileChange}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          selectPresetPrompt={selectPresetPrompt}
          handlePromptChange={handlePromptChange}
          resetForm={resetForm}
          processImage={processImage}
        />
        <ResultsPanel 
          originalImage={originalImage}
          editedImage={editedImage}
          isLoading={isLoading}
          downloadImage={downloadImage}
        />
      </div>
    </main>
  );
};
