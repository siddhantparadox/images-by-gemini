"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { ApiKeyDialog } from './ApiKeyDialog';
import { useState, useEffect } from 'react';
import { API_KEY_STORAGE_KEY } from './ApiKeyDialog';

export const Header = () => {
  const pathname = usePathname();
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  
  useEffect(() => {
    // Show API key dialog on first visit if no key is saved
    const hasSeenDialog = localStorage.getItem('HAS_SEEN_API_KEY_DIALOG');
    const hasApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    
    if (!hasSeenDialog && !hasApiKey) {
      setShowApiKeyDialog(true);
      localStorage.setItem('HAS_SEEN_API_KEY_DIALOG', 'true');
    }
  }, []);
  
  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3 relative">
            <div className="relative w-8 h-8 overflow-visible">
              <Image 
                src="/images-by-gemini-high-resolution-logo.png" 
                alt="Gemini Logo"
                width={256}
                height={256}
                className="object-contain absolute -top-6 -left-4"
                style={{
                  maxWidth: 'none',
                  width: '250%',
                  height: '250%'
                }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between space-x-4">
            <div className="flex space-x-2">
              <Button 
                asChild
                variant="ghost"
                className={`${
                  pathname === '/' 
                    ? 'bg-white/20 text-white' 
                    : 'hover:bg-white/10 text-white/80'
                }`}
              >
                <Link href="/">Image Editor</Link>
              </Button>
              <Button 
                asChild
                variant="ghost"
                className={`${
                  pathname === '/image-generator' 
                    ? 'bg-white/20 text-white' 
                    : 'hover:bg-white/10 text-white/80'
                }`}
              >
                <Link href="/image-generator">Image Generator</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <ApiKeyDialog initialOpen={showApiKeyDialog} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
