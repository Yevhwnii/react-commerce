import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto';
import { UserRole } from '../users/entities/user.entity';
import type { JwtPayload } from '../auth/strategies';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(dto: CreateOrderDto, userId: string) {
    const productIds = dto.items.map((i) => i.productId);
    const products = await this.productsRepository.findBy({
      id: In(productIds),
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('One or more products not found');
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    for (const item of dto.items) {
      const product = productMap.get(item.productId)!;
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product "${product.name}"`,
        );
      }
    }

    let totalAmount = 0;
    const orderItems: Partial<OrderItem>[] = dto.items.map((item) => {
      const product = productMap.get(item.productId)!;
      totalAmount += Number(product.price) * item.quantity;
      return {
        product,
        quantity: item.quantity,
        price: Number(product.price),
      };
    });

    const order = this.ordersRepository.create({
      user: { id: userId },
      totalAmount,
      shippingAddress: dto.shippingAddress,
      items: orderItems as OrderItem[],
    });

    const saved = await this.ordersRepository.save(order);

    await Promise.all(
      dto.items.map((item) => {
        const product = productMap.get(item.productId)!;
        return this.productsRepository.decrement(
          { id: product.id },
          'stock',
          item.quantity,
        );
      }),
    );

    return saved;
  }

  findAll() {
    return this.ordersRepository.find({
      relations: ['user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  findByUser(userId: string) {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, requestingUser: JwtPayload) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });

    if (!order) throw new NotFoundException('Order not found');

    const isAdmin = (requestingUser.role as UserRole) === UserRole.ADMIN;
    const isOwner = order.user?.id === requestingUser.sub;

    if (!isAdmin && !isOwner) throw new ForbiddenException('Access denied');

    return order;
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    await this.ordersRepository.update(id, { status: dto.status });
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
  }

  async remove(id: string) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    await this.ordersRepository.delete(id);
  }
}
