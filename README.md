# Skytells Image Generator

A beautiful and responsive image generator powered by the Skytells AI API. This application showcases how to integrate the Skytells SDK into a Next.js application to create AI-generated images based on text prompts.

![Skytells Image Generator Demo](assets/banner.jpeg)

Skytells offers a range of AI models for image generation, This project demonstrates how to integrate the Skytells SDK into a Next.js application to create AI-generated images based on text prompts.


## Features

- ✨ Modern UI with animations and visual effects
- 🖼️ Generate images from text prompts using Skytells AI
- 🔄 Loading states and error handling
- 🎨 Responsive design for all devices
- 🌓 Dark and light mode support
- 📱 Mobile-friendly interface
- 🔍 Example prompts for inspiration

## Getting Started

First, Create a Skytells account and get your API key from [https://www.skytells.ai/dashboard/api-keys](https://www.skytells.ai/dashboard/api-keys).

### Prerequisites

- Node.js 18.0.0 or newer
- npm, yarn, or pnpm

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/skytells-ai/image-generator-saas-nextjs.git
   cd image-generator-saas-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file from the example:
   ```bash
   cp .env.local.example .env.local
   ```

4. Add your Skytells API key to the `.env.local` file. You can get your API key from [https://www.skytells.ai/dashboard/api-keys](https://www.skytells.ai/dashboard/api-keys).

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API Routes
│   │   │   └── generate/   # Image generation API endpoint
│   │   ├── components/     # React components
│   │   │   ├── AnimatedBackground.tsx  # Background animation
│   │   │   └── ImageGenerator.tsx      # Main image generator component
│   │   ├── page.tsx        # Home page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
├── .env.local.example      # Example environment variables
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## How It Works

The application uses the Skytells TypeScript SDK to communicate with the Skytells AI API for image generation:

### Frontend (React/Next.js)

1. The main UI is in `src/app/components/ImageGenerator.tsx`, which provides:
   - A text input field for the user's prompt
   - Example prompts for inspiration
   - A "Generate" button to trigger the image generation
   - Loading states and error handling
   - Display of the generated image

2. When a user submits a prompt, the application sends a POST request to the local API endpoint (`/api/generate`).

### Backend (Next.js API Route)

1. The API route in `src/app/api/generate/route.ts` handles the request:
   - Initializes the Skytells client with your API key
   - Sends the prompt to the Skytells API using the SDK
   - Returns the generated image to the frontend

2. The Skytells SDK makes it simple to interact with their AI models:
   ```typescript
   const skytells = createClient(process.env.SKYTELLS_API_KEY || '');
   
   const prediction = await skytells.predict({
     model: 'truefusion-pro',  
     input: {
       prompt: prompt
     }
   });
   ```

## Skytells AI Documentation

For comprehensive documentation on the Skytells AI platform, visit:

- **General Documentation:** [https://docs.skytells.ai](https://docs.skytells.ai)
- **TypeScript SDK Documentation:** [https://docs.skytells.ai/sdks/ts](https://docs.skytells.ai/sdks/ts)
- **Available Models:** [https://docs.skytells.ai/models](https://docs.skytells.ai/models)
- **API Docs:** [https://docs.skytells.ai](https://docs.skytells.ai)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SKYTELLS_API_KEY` | Your Skytells API key from the dashboard |

## Learn More

- [Skytells Documentation](https://docs.skytells.ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request.

## Repository

[https://github.com/skytells-ai/image-generator-saas-nextjs](https://github.com/skytells-ai/image-generator-saas-nextjs)

Made with ❤️ by [Skytells](https://www.skytells.ai)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
