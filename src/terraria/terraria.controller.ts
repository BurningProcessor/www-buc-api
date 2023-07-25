import { Controller, Get, Redirect, Post, HttpCode, HttpStatus, Header } from '@nestjs/common';

@Controller('terraria')
export class TerrariaController {

    @Get()
    @Redirect('https://terraria-game.fandom.com')
    getAll() {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create() {
    }

}
