import { Controller, Get, Version } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiHeader } from '@nestjs/swagger'

@ApiHeader({
	name: 'version',
	enum: ['1', '2'],
	description: 'type version',
	required: true,
})
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Version('1')
	@Get('hello')
	getHello(): string {
		return 'hello ver.1'
	}

	@Version('2')
	@Get('hello')
	getHelloV2(): string {
		return 'hello ver.2'
	}
}
