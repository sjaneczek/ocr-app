import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OcrEntity } from '../entities/Ocr.entity';

@Injectable()
export class OcrRepository {
  constructor(
    @InjectRepository(OcrEntity)
    private readonly ocrRepository: Repository<OcrEntity>,
  ) {}

  // Create new OCR record
  async create(ocrEntity: OcrEntity): Promise<OcrEntity> {
    return await this.ocrRepository.save(ocrEntity);
  }

  // Find all OCR records
  async findAll(): Promise<OcrEntity[]> {
    return await this.ocrRepository.find();
  }

  // Find OCR record by id
  async findById(id: string): Promise<OcrEntity | null> {
    return await this.ocrRepository.findOne({ where: { id } });
  }

  // Update OCR record
  async update(ocrEntity: OcrEntity): Promise<OcrEntity> {
    return await this.ocrRepository.save(ocrEntity);
  }
}
