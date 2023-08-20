import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService
	) { }

	async create(createUserDto: CreateUserDto) {
		createUserDto.email = createUserDto.email.toLowerCase()

		var thisUser = await this.takeUser(createUserDto.email, this.userRepository)
		
		if (thisUser) throw new BadRequestException('This email alredy exist!')

		const user = await this.userRepository.save({
			email: createUserDto.email,
			password: await argon2.hash(createUserDto.password),
		})

		thisUser = await this.takeUser(createUserDto.email, this.userRepository)

		const token = this.jwtService.sign({
			id: thisUser.id,
			email: createUserDto.email
		})

		return { user, token }
	}

	findAll() {
		return `This action returns all user`;
	}

	async findOne(email: string) {
		// return await this.userRepository.findOne({ where: { email } })
		return this.takeUser(email, this.userRepository)
	}

	async takeUser(email:string, userRepository: Repository<User>) {
		return await this.userRepository.findOne({ where: { email } })
	}
}
