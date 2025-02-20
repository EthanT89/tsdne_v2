// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // PostgreSQL connection configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '', 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres', // Default PostgreSQL username
      password: process.env.DB_PASSWORD || 'scotts89', 
      database: process.env.DB_NAME || 'tsdne_db', 
      entities: [],
      synchronize: true, // WARNING: Only use in development; it auto-syncs database schema
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
