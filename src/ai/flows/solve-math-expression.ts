'use server';

/**
 * @fileOverview This file defines a Genkit flow to solve math expressions drawn on a canvas using the Gemini Vision API.
 *
 * - solveMathExpression - A function that takes a data URI of a canvas drawing and returns the solved math expression.
 * - SolveMathExpressionInput - The input type for the solveMathExpression function.
 * - SolveMathExpressionOutput - The return type for the solveMathExpression function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveMathExpressionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a math expression drawn on a canvas, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SolveMathExpressionInput = z.infer<typeof SolveMathExpressionInputSchema>;

const SolveMathExpressionOutputSchema = z.object({
  result: z.string().describe('The solved result of the math expression.'),
});
export type SolveMathExpressionOutput = z.infer<typeof SolveMathExpressionOutputSchema>;

export async function solveMathExpression(input: SolveMathExpressionInput): Promise<SolveMathExpressionOutput> {
  return solveMathExpressionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveMathExpressionPrompt',
  input: {schema: SolveMathExpressionInputSchema},
  output: {schema: SolveMathExpressionOutputSchema},
  prompt: `You are an expert mathematician. You will be given an image of a handwritten math expression. You need to interpret the expression, solve it, and return the final result as a string.

Here is the image of the math expression:

{{media url=photoDataUri}}`,
});

const solveMathExpressionFlow = ai.defineFlow(
  {
    name: 'solveMathExpressionFlow',
    inputSchema: SolveMathExpressionInputSchema,
    outputSchema: SolveMathExpressionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
