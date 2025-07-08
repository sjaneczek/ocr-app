import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const fileSchema = z.custom<Express.Multer.File>();

const createOcrSchema = z.object({
  file: fileSchema.refine((file) => {
    if (!file || typeof file !== 'object') return false;
    if (!('mimetype' in file)) return false;
    if (!['application/pdf'].includes(file.mimetype)) return false;
    return true;
  }, 'Please provide a valid file, must be a PDF'),
});

export class CreateOcrDto extends createZodDto(createOcrSchema) {}
