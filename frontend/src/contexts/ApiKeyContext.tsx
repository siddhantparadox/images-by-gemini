"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { API_KEY_STORAGE_KEY } from "@/components/layout/ApiKeyDialog";
import axios from "axios";
import { toast } from 'sonner';

interface ApiKeyContextType {
  apiKey: string | null;
  hasApiKey: boolean;
  isValidating: boolean;
  lastValidated: Date | null;
  isKeyValid: boolean | null;
  setApiKey: (key: string | null) => void;
  clearApiKey: () => void;
  validateApiKey: (key?: string) => Promise<boolean>;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

// Constants for storing validation state
const KEY_VALIDATION_STATUS = "GEMINI_KEY_VALIDATION_STATUS";
const KEY_LAST_VALIDATED = "GEMINI_KEY_LAST_VALIDATED";

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [lastValidated, setLastValidated] = useState<Date | null>(null);
  const [isKeyValid, setIsKeyValid] = useState<boolean | null>(null);

  useEffect(() => {
    // Load API key and validation status from localStorage on initial render (client-side only)
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (savedKey) {
        setApiKeyState(savedKey);
        setHasApiKey(true);
        
        // Also load validation status if available
        const validationStatus = localStorage.getItem(KEY_VALIDATION_STATUS);
        if (validationStatus) {
          setIsKeyValid(validationStatus === 'true');
        }
        
        const lastValidatedStr = localStorage.getItem(KEY_LAST_VALIDATED);
        if (lastValidatedStr) {
          try {
            setLastValidated(new Date(lastValidatedStr));
          } catch (e) {
            console.error('Error parsing last validated date:', e);
          }
        }
      }
    }
  }, []);

  const validateApiKey = async (keyToValidate?: string): Promise<boolean> => {
    const keyToUse = keyToValidate || apiKey;
    
    if (!keyToUse) {
      setIsKeyValid(false);
      return false;
    }
    
    setIsValidating(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/validate-key/', null, {
        headers: {
          'X-API-Key': keyToUse
        }
      });
      
      const isValid = response.data.valid === true;
      setIsKeyValid(isValid);
      const now = new Date();
      setLastValidated(now);
      
      // Persist the validation status to localStorage
      localStorage.setItem(KEY_VALIDATION_STATUS, isValid.toString());
      localStorage.setItem(KEY_LAST_VALIDATED, now.toISOString());
      
      // Update session storage based on validation result
      if (isValid) {
        sessionStorage.removeItem('INVALID_API_KEY');
      } else {
        sessionStorage.setItem('INVALID_API_KEY', 'true');
      }
      
      return isValid;
    } catch (error) {
      console.error('Error validating API key:', error);
      setIsKeyValid(false);
      sessionStorage.setItem('INVALID_API_KEY', 'true');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const setApiKey = (key: string | null) => {
    if (key) {
      localStorage.setItem(API_KEY_STORAGE_KEY, key);
      setApiKeyState(key);
      setHasApiKey(true);
      // Reset validation state when a new key is set
      setIsKeyValid(null);
      setLastValidated(null);
      // Also clear validation status in localStorage
      localStorage.removeItem(KEY_VALIDATION_STATUS);
      localStorage.removeItem(KEY_LAST_VALIDATED);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    localStorage.removeItem(KEY_VALIDATION_STATUS);
    localStorage.removeItem(KEY_LAST_VALIDATED);
    setApiKeyState(null);
    setHasApiKey(false);
    setIsKeyValid(null);
    setLastValidated(null);
    
    // Show toast notification that the app is now using the shared key
    toast.info("Using Shared API Key", {
      description: "You've removed your personal API key. The app will now use the shared key for API requests.",
      duration: 4000,
      action: {
        label: "Add Key",
        onClick: () => {
          const element = document.querySelector('[aria-label="Manage API Key"]');
          if (element) (element as HTMLElement).click();
        },
      },
    });
  };

  return (
    <ApiKeyContext.Provider value={{ 
      apiKey, 
      hasApiKey, 
      isValidating,
      lastValidated,
      isKeyValid,
      setApiKey, 
      clearApiKey,
      validateApiKey
    }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
}
