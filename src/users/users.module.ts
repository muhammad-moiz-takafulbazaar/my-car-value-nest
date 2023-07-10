import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/reports/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
