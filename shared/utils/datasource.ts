import { DataSource } from 'typeorm'
import fs from 'fs'

var envpath = '.env'
if (process.env.NODE_ENV != undefined) envpath = envpath + process.env.NODE_ENV
require('dotenv').config({ path: envpath })
console.log('LOG: ENV IS:' + envpath)

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: true,
	entities: [__dirname + '/../../dist/**/*.entity{.ts,.js}'],
	migrations: [__dirname + '/../../database/migrations/**/*{.ts,.js}'],
	synchronize: false,
	migrationsTableName: 'migrations',
	migrationsRun: false,
})

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!')
	})
	.catch((err) => {
		console.error('Error during Data Source initialization', err)
	})
