import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Config/prisma.service';
import { utils } from 'src/Utils';
import { Meals } from '@prisma/client';

@Injectable()
export class MealService {
  constructor(private prisma: PrismaService) {}
  async getMeals(): Promise<Array<Meals>> {
    const _meal: Array<Meals> = await this.prisma.meals.findMany();
    let meals: Array<Meals> = [];
    _meal.forEach((meal: Meals, _) => meals.push(utils.mapToMeal(meal)));
    return meals;
  }
}
