import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { IUser, IUserLoginData } from 'src/types/types'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<IUserLoginData> {
		createUserDto.email = createUserDto.email.toLowerCase()

		var thisUser = await this.findOne(createUserDto.email)

		if (thisUser) throw new BadRequestException('This email alredy exist!')

		const user = await this.userRepository.save({
			email: createUserDto.email,
			password: await argon2.hash(createUserDto.password),
		})

		const token: IUser = {
			id: user.id,
			email: user.email,
		}

		return {
			user: token,
			token: this.jwtService.sign(token),
		}
	}

	findAll() {
		return `This action returns all user`
	}

	async findOne(email: string) {
		return await this.userRepository.findOne({ where: { email } })
	}
}
