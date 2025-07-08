import { z } from 'zod';
import { OCRResult } from '../../domain/enum/OcrResult.types';

export const OcrResultSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty'),
  confidence: z.number().min(0).max(1, 'Confidence must be between 0 and 1'),
  language: z.string().min(1, 'Language code must be present'),
});

export const isValidOcrResult = (ocrResult: OCRResult) => {
  const result = OcrResultSchema.safeParse(ocrResult);

  return result.success;
};
