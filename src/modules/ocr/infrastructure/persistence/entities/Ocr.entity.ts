import { OCRResult } from 'src/modules/ocr/domain/enum/OcrResult.types';
import { OcrStatus } from 'src/modules/ocr/domain/enum/OcrStatus.enum';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ocr')
export class OcrEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', nullable: true })
  filePath: string | null;

  @Column({ enum: OcrStatus, nullable: false })
  status: OcrStatus;

  @Column({ type: 'date', nullable: false })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  extractedText: OCRResult | null;
}
