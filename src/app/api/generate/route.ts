import { createClient } from 'skytells';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    /**
     * Initialize Skytells client
     * In production, you'd want to use an environment variable for the API key
     * 
     * @param process.env.SKYTELLS_API_KEY - The API key for the Skytells API
     * You can get your API key from the Skytells dashboard
     * https://www.skytells.ai/settings/api-keys
     */
    const skytells = createClient(process.env.SKYTELLS_API_KEY || '');
    
    // Make prediction request to Skytells API
    const prediction = await skytells.predict({
      // The model to use for image generation
      // truefusion-pro is a powerful model for image generation
      // to learn more about the model, visit https://docs.skytells.ai/models
      model: 'truefusion-pro',  
      input: {
        prompt: prompt
      }
    });
    
    return NextResponse.json(prediction);
  } catch (error: any) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    );
  }
} 