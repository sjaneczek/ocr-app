import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { OcrService } from '../../application/services/Ocr.service';
import { CreateOcrDto } from './dto/CreateOcr.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateOcrProcessResponseDto } from '../../application/dto/CreateOcrProcessResponse.dto';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createOcrProcess(
    @UploadedFile() file: CreateOcrDto,
  ): Promise<CreateOcrProcessResponseDto> {
    const parsed = CreateOcrDto.schema.safeParse({ file });

    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten().fieldErrors);
    }

    return await this.ocrService.createOcrProcess({ file: parsed.data.file });
  }

  @Get()
  async readOrcProcess(): Promise<CreateOcrProcessResponseDto[]> {
    return await this.ocrService.readOrcProcessRecords();
  }
}
