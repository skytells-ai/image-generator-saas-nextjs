import ImageGenerator from "./components/ImageGenerator";
import AnimatedBackground from "./components/AnimatedBackground";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Header */}
      <header className="w-full p-4 flex justify-center border-b border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
        <div className="max-w-7xl w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="font-semibold">Skytells AI Image Generator</span>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <a 
                  href="https://docs.skytells.ai/sdks/ts" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Docs
                </a>
              </li>
              <li>
                <a 
                  href="https://www.skytells.ai/dashboard/api-keys" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  API Keys
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        <ImageGenerator />
      </main>
      
      {/* Footer */}
      <footer className="w-full py-4 px-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 text-sm">
        <p>
          Powered by{" "}
          <a 
            href="https://skytells.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-purple-600 dark:text-purple-400 hover:underline"
          >
            Skytells AI
          </a>{" "}
          &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
