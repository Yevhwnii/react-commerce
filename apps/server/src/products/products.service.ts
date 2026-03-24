import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';

export interface ProductsFilter {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(filter: ProductsFilter = {}) {
    const { category, search, page = 1, limit = 12 } = filter;
    const qb = this.productsRepository
      .createQueryBuilder('product')
      .where('product.isActive = :isActive', { isActive: true });

    if (category) {
      qb.andWhere('product.category = :category', { category });
    }

    if (search) {
      qb.andWhere('product.name LIKE :search', { search: `%${search}%` });
    }

    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  create(dto: CreateProductDto) {
    const product = this.productsRepository.create(dto);
    return this.productsRepository.save(product);
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);
    await this.productsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.productsRepository.delete(id);
  }
}
