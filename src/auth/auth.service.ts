import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { IUser, IUserLoginData } from 'src/types/types'
import { use } from 'passport'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findOne(email.toLowerCase())
		var passwordIsMatch: boolean

		if (user) passwordIsMatch = await argon2.verify(user.password, password)

		if (user && passwordIsMatch) return user
		else throw new BadRequestException('User or password are incorrect!')
	}

	async login(user: IUser): Promise<IUserLoginData> {
		const token: IUser = {
			id: user.id,
			email: user.email
		}

		return {
			user: token,
			token: this.jwtService.sign(token),
		}
	}
}
