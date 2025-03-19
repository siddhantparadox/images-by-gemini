import { useState } from 'react';
import axios from 'axios';
import { useApiKey } from '@/contexts/ApiKeyContext';
import { toast } from 'sonner';

export const useImageGenerator = () => {
  const { apiKey } = useApiKey();
  
  // Toast notifications for API key are now managed in ApiKeyContext
  
  // State management
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedMimeType, setGeneratedMimeType] = useState<string>('image/jpeg');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);
  
  // Sample prompt suggestions
  const [promptSuggestions] = useState([
    "A 3D rendered image of a pig with wings and a top hat flying over a futuristic city",
    "A watercolor painting of a sunset over mountains with a cabin in the foreground",
    "A detailed digital art of a magical forest with glowing mushrooms and fairies",
    "A photorealistic image of a cat wearing sunglasses on a beach",
    "A vintage comic book style superhero flying through clouds",
    "A whimsical sketch of a coffee shop in Paris on a rainy day",
    "An oil painting of a field of lavender with a castle in the distance",
    "A cyberpunk cityscape at night with neon lights and flying cars",
    "A Studio Ghibli style scene of children playing in a meadow with magical creatures",
    "A realistic portrait of an alien diplomat in a futuristic spacesuit"
  ]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const selectPromptSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const resetForm = () => {
    setPrompt('');
    setGeneratedImage(null);
    setError(null);
    setResponseText(null);
  };

  // API interaction
  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please provide a detailed description for the image you want to generate');
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
      
      const response = await axios.post('http://localhost:8000/api/generate-image/', formData, {
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
        setGeneratedImage(`data:${response.data.mime_type || 'image/jpeg'};base64,${response.data.image}`);
        setGeneratedMimeType(response.data.mime_type || 'image/jpeg');
        if (response.data.text) {
          setResponseText(response.data.text);
        }
      } else if (response.data.text) {
        setResponseText(response.data.text);
        setError('No image was generated, but the model provided a response');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Error generating your image. Please try again with a different prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `generated-image.${generatedMimeType.split('/')[1] || 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
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
  };
};
