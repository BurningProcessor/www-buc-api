import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { VersioningType } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableVersioning({
		type: VersioningType.HEADER,
    header: 'version'
	})
  app.enableCors()

	const config = new DocumentBuilder()
    .setTitle('Versioning Example')
    .setDescription('The API description')
    .build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)
	
  await app.listen(3000)
	
}
bootstrap()
