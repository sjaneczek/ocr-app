import { OCRResult } from '../enum/OcrResult.types';
import { OcrStatus } from '../enum/OcrStatus.enum';

interface OcrAggregateProps {
  id: string;
  filePath: string | null;
  status: OcrStatus;
  extractedText: OCRResult | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export class OcrAggregate {
  readonly id: string;
  readonly createdAt: Date;
  filePath: string | null;
  updatedAt: Date | null;
  status: OcrStatus;
  extractedText: OCRResult | null;

  constructor(props: OcrAggregateProps) {
    this.id = props.id;
    this.filePath = props.filePath;
    this.status = props.status;
    this.extractedText = props.extractedText;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getFilePath(): string {
    if (!this.filePath) {
      throw new Error('Ocr file path is not set');
    }
    return this.filePath;
  }

  setStatus(status: OcrStatus): void {
    if (this.status === status) {
      throw new Error('Ocr is already in this status');
    }
    this.status = status;
    this.updatedAt = new Date();
  }

  setExtractedText(extractedText: OCRResult): void {
    this.extractedText = extractedText;
    this.updatedAt = new Date();
  }
}
