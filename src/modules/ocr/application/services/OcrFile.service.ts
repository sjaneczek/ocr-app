import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class OcrFileService {
  private readonly uploadDir = path.join(
    __dirname,
    '..',
    '..',
    'infrastructure',
    'data',
  );

  async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      // Ensure directory exists
      await fs.mkdir(this.uploadDir, { recursive: true });

      // Create unique filename
      const fileName = `${Date.now()}_${file.originalname}`;
      const filePath = path.join(this.uploadDir, fileName);

      // Save file
      await fs.writeFile(filePath, file.buffer);

      return filePath;
    } catch {
      throw new Error(`Failed to save file`);
    }
  }

  async readFile(filePath: string): Promise<Buffer> {
    try {
      const file = await fs.readFile(filePath);
      return file;
    } catch {
      throw new Error(`Failed to read file`);
    }
  }
}
