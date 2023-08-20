import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepository.findBy({
      user: { id },
      title: createCategoryDto.title
    })

    if(isExist.length) throw new BadRequestException('This category alredy exist!')
    
    const newCategory = {
      title: createCategoryDto.title,
      user: { id }
    }
    
    return await this.categoryRepository.save(newCategory)
  }

  async findAll(id: number) {
    return await this.categoryRepository.find({
      where: { user: { id } },
      relations: { transactions: true }
    })
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        user: true,
        transactions: true
      }
    })

    if(!category) this.CategoryNotFoundException()
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if(await this.FindCategory(id)) {
      await this.categoryRepository.update(id, updateCategoryDto)
      return 'Category UPDATE'
    }
    else this.CategoryNotFoundException()
  }

  async remove(id: number) {
    if(await this.FindCategory(id)) {
      await this.categoryRepository.delete(id)
      return 'Category DELETED'
    }
    else this.CategoryNotFoundException()
  }

  private async FindCategory(id: number) {
    return await this.categoryRepository.findOne({ where: { id } })
  }

  private CategoryNotFoundException() { throw new NotFoundException('Category not found') }
}
