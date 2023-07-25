import { Body, Controller, Delete, Get, Param, Post, Put, createParamDecorator } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

const id: string = ':id'
const id_val: string = 'id'

@Controller('products')
export class ProductsController {
	
	constructor(private readonly productsService: ProductsService) {
	}

	@Get()
	getAll() {
		return this.productsService.getAll()
	}

	@Get(id)
	getOne(@Param(id_val) id: string) {
		return 'getOne ' + this.productsService.getById(id)
	}

	@Post()
	create(@Body() CreateProductDto: CreateProductDto) {
		return this.productsService.create(CreateProductDto)
	}

	@Delete(id)
	remove(@Param(id_val) id: string) {
		return 'Remove ' + id
	}

	@Put(id)
	update(@Param() UpdateProductDto: UpdateProductDto,	@Param(id_val) id: string): string {
		return `Update ` + id 
	}
}
