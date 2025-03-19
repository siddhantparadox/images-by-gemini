"use client";

import { useState, useEffect } from "react";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const API_KEY_STORAGE_KEY = "GEMINI_USER_API_KEY";

interface ApiKeyDialogProps {
  initialOpen?: boolean;
  onKeyUpdate?: () => void;
}

export const ApiKeyDialog = ({ initialOpen = false, onKeyUpdate }: ApiKeyDialogProps) => {
  const { validateApiKey, isValidating, isKeyValid, setApiKey: setGlobalApiKey, clearApiKey } = useApiKey();
  const [apiKey, setApiKey] = useState("");
  const [open, setOpen] = useState(initialOpen);
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const [invalidKeyWarning, setInvalidKeyWarning] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if user already has an API key in localStorage
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    setHasSavedKey(!!savedKey);
    if (savedKey) {
      setApiKey(savedKey);
      
      // If we have a validated state for this key, set the validation message accordingly
      // This will ensure the validation status is maintained between dialog opens
      if (isKeyValid !== null) {
        if (isKeyValid) {
          setValidationMessage("API key is valid!");
        } else {
          setValidationMessage("API key validation failed. The key may be invalid, expired, or lack necessary permissions.");
        }
      }
    }
  }, [open, isKeyValid]); // Re-run when dialog opens or validation state changes

  // Read from sessionStorage to see if we've detected an invalid key
  // and do this whenever the dialog opens or the component mounts
  useEffect(() => {
    const checkInvalidKey = () => {
      const isKeyInvalid = sessionStorage.getItem('INVALID_API_KEY') === 'true';
      setInvalidKeyWarning(isKeyInvalid);
    };
    
    // Check immediately
    checkInvalidKey();
    
    // Also set up a listener for any changes to sessionStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'INVALID_API_KEY') {
        checkInvalidKey();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [open]);

  const validateApiKeyFormat = (key: string) => {
    // Basic validation for Gemini API key format
    // Google API keys typically start with "AI" and are 39 characters long
    return /^AI[a-zA-Z0-9_-]{37}$/.test(key.trim());
  };

  const handleValidateClick = async () => {
    if (!apiKey.trim() || !validateApiKeyFormat(apiKey.trim())) {
      setValidationMessage("API key format is invalid. Google Gemini API keys typically start with 'AI' and are 39 characters long.");
      return;
    }
    
    setValidationMessage(null);
    try {
      // This will update and persist the validation status in the context
      const isValid = await validateApiKey(apiKey.trim());
      
      // Update local state for UI feedback
      if (isValid) {
        setValidationMessage("API key is valid and ready to use!");
        setInvalidKeyWarning(false);
      } else {
        setValidationMessage("API key validation failed. The key may be invalid, expired, or lack necessary permissions.");
      }
    } catch (error) {
      console.error('Error during validation:', error);
      setValidationMessage("Error connecting to validation service. Please try again.");
    }
  };

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;
    
    // Basic format validation
    if (!validateApiKeyFormat(apiKey.trim())) {
      alert(`The API key format appears to be invalid. Google Gemini API keys typically start with "AI" and are 39 characters long.`);
      return;
    }
    
    // If key hasn't been validated yet, validate it before saving
    if (validationMessage === null) {
      const isValid = await validateApiKey(apiKey.trim());
      
      // If validation fails, ask user if they still want to save
      if (!isValid) {
        const confirmSave = window.confirm(
          "The API key couldn't be validated. Do you still want to save it? " +
          "If you save an invalid key, the app will fall back to using the shared key."
        );
        
        if (!confirmSave) return;
      }
    } else if (!isKeyValid) {
      // If key was already validated and is invalid, confirm with user
      const confirmSave = window.confirm(
        "You're trying to save an API key that failed validation. Do you still want to save it? " +
        "If you save an invalid key, the app will fall back to using the shared key."
      );
      
      if (!confirmSave) return;
    }
    
    // Save the key
    setGlobalApiKey(apiKey.trim());
    
    // Update UI states
    sessionStorage.removeItem('INVALID_API_KEY'); // Manually clear invalid key flag
    setHasSavedKey(true);
    setInvalidKeyWarning(false);
    setOpen(false);
    
    if (onKeyUpdate) onKeyUpdate();
  };

  const handleDeleteKey = () => {
    // Use the context method to clear the key
    clearApiKey();
    
    // Update local state
    setApiKey("");
    setHasSavedKey(false);
    
    // Close dialog
    setOpen(false);
    
    if (onKeyUpdate) onKeyUpdate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white/90 hover:bg-white/10"
          aria-label="Manage API Key"
        >
          {hasSavedKey ? "Manage API Key" : "Add API Key"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gemini API Key</DialogTitle>
        <DialogDescription>
          We recommend using your own API key since creating and using an API key is free from Google AI Studio.
          If you do not provide one, a shared key will be used, which might lead to failures if used by many.
          {invalidKeyWarning && (
            <div className="mt-3 p-3 border border-red-300 bg-red-50 rounded-md">
              <p className="text-red-600 font-semibold mb-1">Invalid API Key Detected</p>
              <p className="text-sm text-red-600">
                The API key you provided could not be validated with Google&apos;s Gemini API. 
                This could be because:
              </p>
              <ul className="list-disc list-inside text-sm text-red-600 mt-1 ml-1">
                <li>The key has been entered incorrectly</li>
                <li>The key has expired or been revoked</li>
                <li>The key doesn&apos;t have access to the required Gemini models</li>
              </ul>
              <p className="text-sm text-red-600 mt-1">
                Please check your key or generate a new one. The app is currently using the shared key instead.
              </p>
            </div>
          )}
        </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-2">
            <Input
              id="apiKey"
              className="flex-1"
              type="password"
              placeholder="Enter your Google Gemini API key"
              value={apiKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setApiKey(e.target.value);
                // Clear validation message when key changes
                setValidationMessage(null);
              }}
            />
            <Button
              type="button"
              size="sm"
              onClick={handleValidateClick}
              disabled={isValidating || !apiKey.trim()}
              className="whitespace-nowrap"
            >
              {isValidating ? 'Validating...' : 'Validate'}
            </Button>
          </div>
          
          {validationMessage && (
            <div className={`p-3 rounded-md ${isKeyValid ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
              <p className={`font-semibold ${isKeyValid ? 'text-green-600' : 'text-red-600'}`}>
                {isKeyValid ? '✓ Key is valid!' : '✗ Key validation failed'}
              </p>
              <p className={`text-sm mt-1 ${isKeyValid ? 'text-green-600' : 'text-red-600'}`}>
                {validationMessage}
              </p>
            </div>
          )}
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Get API key from Google AI Studio
          </a>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          {hasSavedKey && (
            <Button variant="destructive" onClick={handleDeleteKey}>
              Delete Key
            </Button>
          )}
          <Button 
            type="submit" 
            onClick={handleSaveKey}
            disabled={isValidating}
          >
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
