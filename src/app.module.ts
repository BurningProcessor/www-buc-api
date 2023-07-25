import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { TerrariaController } from './terraria/terraria.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, TerrariaController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
