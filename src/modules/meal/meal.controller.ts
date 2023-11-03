import { Controller, Get, HttpStatus } from '@nestjs/common';
import { MealService } from './meal.service';
import { Meals } from '@prisma/client';
import { ResponseDto } from 'src/common/Dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}
  @Get()
  @ApiOperation({ summary: 'Get all meals' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: ResponseDto<Array<Meals>>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getMeals(): Promise<ResponseDto<Array<Meals>>> {
    const resp: Array<Meals> = await this.mealService.getMeals();
    return {
      data: resp,
      message: 'Success',
      status: HttpStatus.CREATED,
    };
  }
}
