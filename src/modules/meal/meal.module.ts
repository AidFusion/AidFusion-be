import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';

@Module({
  controllers: [MealController],
  providers: [MealService]
})
export class MealModule {}
