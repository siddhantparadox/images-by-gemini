"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GeneratorPanel } from '@/components/generator/GeneratorPanel';
import { GeneratedImageDisplay } from '@/components/generator/GeneratedImageDisplay';
import { useImageGenerator } from '@/hooks/useImageGenerator';

export default function ImageGenerator() {
  const {
    prompt,
    generatedImage,
    isLoading,
    error,
    responseText,
    promptSuggestions,
    handlePromptChange,
    selectPromptSuggestion,
    resetForm,
    generateImage,
    downloadImage
  } = useImageGenerator();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GeneratorPanel 
            prompt={prompt}
            isLoading={isLoading}
            error={error}
            responseText={responseText}
            promptSuggestions={promptSuggestions}
            handlePromptChange={handlePromptChange}
            selectPromptSuggestion={selectPromptSuggestion}
            resetForm={resetForm}
            generateImage={generateImage}
          />
          <GeneratedImageDisplay 
            generatedImage={generatedImage}
            isLoading={isLoading}
            downloadImage={downloadImage}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
