import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestsService {

  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  create(createRequestDto: CreateRequestDto) {
    const request = this.requestRepository.create(createRequestDto);
    return this.requestRepository.save(request);
  }

  async findAll(): Promise<Request[]> {
    return this.requestRepository.find();
  }

  findOne(id: string) {
    return this.requestRepository.findOne({ where: { requestId: id } });
  }

  update(id: string, updateRequestDto: UpdateRequestDto) {
    return this.requestRepository.update(id, updateRequestDto);
  }

  remove(id: string) {
    return this.requestRepository.delete(id);
  }
}
