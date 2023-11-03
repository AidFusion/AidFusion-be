import { Controller, Get, HttpStatus } from '@nestjs/common';
import { MealService } from './meal.service';
import { Meals } from '@prisma/client';
import { ResponseDto } from 'src/common/Dto';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}
  @Get()
  async getMeals(): Promise<ResponseDto<Array<Meals>>> {
    const resp: Array<Meals> = await this.mealService.getMeals();
    return {
      data: resp,
      message: 'Success',
      status: HttpStatus.CREATED,
    };
  }
}
