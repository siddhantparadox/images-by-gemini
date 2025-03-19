import { useState, useRef } from 'react';
import axios from 'axios';
import { useApiKey } from '@/contexts/ApiKeyContext';
import { toast } from 'sonner';

interface UseImageEditorProps {
  presetPrompts?: string[];
}

// Define the return type for the hook
export type UseImageEditorReturn = ReturnType<typeof useImageEditor>;

export const useImageEditor = ({ presetPrompts = [] }: UseImageEditorProps = {}) => {
  const { apiKey } = useApiKey();

  // Toast notifications for API key are now managed in ApiKeyContext
  
  // State management
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [editedMimeType, setEditedMimeType] = useState<string>('image/jpeg');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Preset prompts for common image edits
  const [availablePrompts] = useState(presetPrompts.length > 0 ? presetPrompts : [
    "Transform this into a watercolor painting with vibrant colors and visible brush strokes",
    "Make this look like it was taken during golden hour with warm orange lighting and long shadows",
    "Turn this into an oil painting in the style of Claude Monet with impressionist techniques",
    "Convert this to detailed pixel art style with a limited color palette",
    "Make this look like a scene from a Studio Ghibli film with whimsical elements",
    "Transform this into a precise pencil sketch with detailed crosshatching and shading",
    "Convert this to a comic book style with bold black outlines and vibrant colors",
    "Add a dramatic sunset sky in the background with purple and orange hues",
    "Make this look like it was taken in the 1970s with vintage film grain and faded colors",
    "Transform this into a futuristic cyberpunk scene with bright neon lights and urban elements",
    "Add dramatic movie-like lighting with strong contrasts and shadows",
    "Convert this to look like it's made of stained glass with black outlines",
    "Make this look like a screenshot from a 3D animated Pixar movie"
  ]);

  // File handling logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
      setError(null);
    } else {
      setError('Please drop an image file');
    }
  };

  const selectPresetPrompt = (selectedPrompt: string) => {
    if (selectedPrompt) setPrompt(selectedPrompt);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const resetForm = () => {
    setFile(null);
    setPrompt('');
    setOriginalImage(null);
    setEditedImage(null);
    setError(null);
    setResponseText(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // API interaction
  const processImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !prompt) {
      setError('Please upload an image and provide editing instructions');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResponseText(null);
    
    // Show toast ONLY if no API key is provided - this is critical toast #1
    // Double-check that apiKey is truly empty (null, undefined, or empty string)
    if (!apiKey || apiKey.trim() === '') {
      toast.warning("No Personal API Key", { 
        description: "You're using the shared API key, which may be less reliable. Consider adding your own key.",
        duration: 4000,
        action: {
          label: "Add Key",
          onClick: () => {
            const element = document.querySelector('[aria-label="Manage API Key"]');
            if (element) (element as HTMLElement).click();
          },
        },
      });
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', prompt);
    
    try {
      // Add the API key to headers if available and not empty
      const headers: Record<string, string> = {
        'Content-Type': 'multipart/form-data',
      };
      
      if (apiKey && apiKey.trim() !== '') {
        headers['X-API-Key'] = apiKey.trim();
        console.log('Using personal API key for request');
      } else {
        console.log('No API key available, using shared key');
      }
      
      const response = await axios.post('http://localhost:8000/api/edit-image/', formData, {
        headers,
      });
      
      // Check if we're using default key despite having a user key - this is critical toast #2
      if (response.data.using_default_key && apiKey) {
        // Mark the API key as invalid in session storage
        sessionStorage.setItem('INVALID_API_KEY', 'true');
        
        // Show toast notification for invalid key
        toast.error(
          "Invalid API Key Detected", 
          {
            description: "Your API key could not be validated. The application has fallen back to using the shared key.",
            duration: 6000,
            action: {
              label: "Update Key",
              onClick: () => {
                const element = document.querySelector('[aria-label="Manage API Key"]');
                if (element) (element as HTMLElement).click();
              },
            },
          }
        );
        
        // Dispatch a storage event to ensure the dialog state updates if opened manually
        window.dispatchEvent(new StorageEvent('storage', { 
          key: 'INVALID_API_KEY',
          newValue: 'true'
        }));
        
        console.log('Invalid API key detected, using default key instead');
      }
      
      if (response.data.image) {
        setEditedImage(`data:${response.data.mime_type || 'image/jpeg'};base64,${response.data.image}`);
        setEditedMimeType(response.data.mime_type || 'image/jpeg');
        if (response.data.text) {
          setResponseText(response.data.text);
        }
      } else if (response.data.text) {
        setResponseText(response.data.text);
        setError('No image was generated, but the model provided a response');
      }
    } catch (error) {
      console.error('Error editing image:', error);
      setError('Error processing your image. Please try again with a different image or prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (editedImage) {
      const link = document.createElement('a');
      link.href = editedImage;
      link.download = `edited-image.${editedMimeType.split('/')[1] || 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    file,
    prompt,
    originalImage,
    editedImage,
    editedMimeType,
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
  };
};
