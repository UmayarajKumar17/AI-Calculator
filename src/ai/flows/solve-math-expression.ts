'use server';

/**
 * @fileOverview This file defines a Genkit flow to solve questions drawn on a canvas using the Gemini Vision API.
 *
 * - solveQuestion - A function that takes a data URI of a canvas drawing and returns the solved question.
 * - SolveQuestionInput - The input type for the solveQuestion function.
 * - SolveQuestionOutput - The return type for the solveQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveQuestionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a question drawn on a canvas, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SolveQuestionInput = z.infer<typeof SolveQuestionInputSchema>;

const SolveQuestionOutputSchema = z.object({
  result: z.string().describe('The solved result of the question.'),
});
export type SolveQuestionOutput = z.infer<typeof SolveQuestionOutputSchema>;

export async function solveQuestion(input: SolveQuestionInput): Promise<SolveQuestionOutput> {
  return solveQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveQuestionPrompt',
  input: {schema: SolveQuestionInputSchema},
  output: {schema: SolveQuestionOutputSchema},
  prompt: `You are an expert at solving various kinds of problems. You will be given an image of a handwritten question. This could be a math expression, a logic puzzle, a simple drawing to identify, or a general knowledge question. You need to interpret the question from the image, solve it, and return the final answer as a string.

Here is the image of the question:

{{media url=photoDataUri}}`,
});

const solveQuestionFlow = ai.defineFlow(
  {
    name: 'solveQuestionFlow',
    inputSchema: SolveQuestionInputSchema,
    outputSchema: SolveQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
