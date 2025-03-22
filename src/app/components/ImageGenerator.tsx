'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Example prompts with descriptions
const EXAMPLE_PROMPTS = [
  { text: "A futuristic cityscape at sunset with flying cars", category: "Sci-fi" },
  { text: "A serene mountain lake surrounded by autumn trees", category: "Nature" },
  { text: "A cute robot playing with a cat in a living room", category: "Whimsical" },
  { text: "An astronaut riding a horse on Mars", category: "Surreal" },
];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      
      // Store the raw response
      setRawResponse(data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }
      
      if (data.metadata?.storage?.files?.length > 0) {
        setImage(data.metadata.storage.files[0].url);
      } else if (data.output && data.output.length > 0) {
        setImage(data.output[0]);
      } else {
        throw new Error('No image generated');
      }
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const useExamplePrompt = (promptText: string) => {
    setPrompt(promptText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className={`w-full max-w-3xl mx-auto relative ${sidebarOpen ? 'mr-80' : ''}`}>
      {/* Heading with animation */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 animate-gradient">
          Skytells Image Generator
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Transform your ideas into stunning visuals with AI-powered image generation
        </p>
      </div>

      {/* Input area */}
      <div className="relative mb-6">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="w-full p-4 pr-20 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none min-h-[100px] bg-white/5 backdrop-blur-sm transition-all duration-300 border-gray-200 dark:border-gray-700"
          disabled={isGenerating}
        />
        <button
          onClick={generateImage}
          disabled={isGenerating || !prompt.trim()}
          className={`absolute right-3 bottom-3 px-4 py-2 rounded-lg transition-all duration-300 ${
            isGenerating || !prompt.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </div>
          ) : (
            'Generate'
          )}
        </button>
      </div>

      {/* Example prompts as capsules - only show when not generating and no image exists */}
      {!isGenerating && !image && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Try these examples:</h3>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <button 
                key={index}
                onClick={() => useExamplePrompt(example.text)}
                className="inline-flex items-center px-3 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105 relative"
              >
                {/* Always visible neon border */}
                <div className="absolute inset-0 neon-capsule rounded-full"></div>
                <div className="relative z-10">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{example.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Image result area with animation */}
      <div className={`relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 bg-white/5 backdrop-blur-sm ${
        isGenerating ? 'min-h-[300px]' : image ? 'min-h-[300px]' : 'min-h-0'
      }`}>
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative w-16 h-16 mb-3">
              {/* Animated particles */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-1.5 h-1.5 bg-purple-500 rounded-full"
                    style={{
                      animation: `moveParticle 1.5s infinite ease-in-out, fadeParticle 1.5s infinite ease-in-out`,
                      animationDelay: `${i * 0.3}s`,
                      top: '50%',
                      left: '50%',
                    }}
                  />
                ))}
              </div>
              <svg className="animate-spin w-full h-full text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Creating your masterpiece...
            </p>
          </div>
        ) : image ? (
          <div className="relative w-full aspect-square animate-fadeIn">
            <Image 
              src={image} 
              alt="Generated image" 
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="rounded-2xl object-contain"
            />
            {/* Response data toggle button */}
            {rawResponse && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300"
                title={sidebarOpen ? "Hide response data" : "Show response data"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </button>
            )}
          </div>
        ) : null}
      </div>

      {/* Response sidebar */}
      <div className={`fixed top-0 right-0 w-80 h-full bg-gray-900 text-gray-200 overflow-auto transition-all duration-300 ease-in-out transform z-50 ${
        sidebarOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
      }`}>
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="font-medium">Response Data</h3>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-full hover:bg-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <pre className="text-xs whitespace-pre-wrap break-words">
            {rawResponse ? JSON.stringify(rawResponse, null, 2) : 'No data available'}
          </pre>
        </div>
      </div>

      {/* CTA for API key */}
      <div className="mt-10 p-5 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/30">
        <h3 className="font-semibold mb-2">Get your API key</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          To use this image generator in your own projects, you'll need a Skytells API key.
        </p>
        <a 
          href="https://www.skytells.ai/dashboard/api-keys" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
        >
          Get your API key
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>

      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes moveParticle {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(calc(-50% + 10px), calc(-50% + 10px)); }
        }
        
        @keyframes fadeParticle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Neon border effect */
        .neon-border {
          border-radius: 0.5rem;
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(
            45deg,
            #ff00cc, #3393ff, #00ffe7, #ff00cc
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 400% 400%;
          animation: neonGlow 3s linear infinite;
          transition: opacity 0.3s ease;
        }

        /* Capsule neon border effect */
        .neon-capsule {
          position: absolute;
          inset: 0;
          padding: 1px;
          background: linear-gradient(
            45deg,
            #ff00cc, #3393ff, #00ffe7, #ff00cc
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 400% 400%;
          animation: neonGlow 3s linear infinite;
          box-shadow: 0 0 8px rgba(255, 0, 204, 0.3);
        }

        @keyframes neonGlow {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </div>
  );
} 