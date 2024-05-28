import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BrandsService } from 'src/brands/brands.service';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly carsService: CarsService,
    private readonly bransService: BrandsService,
  ){}

  populateDB(){
    this.carsService.fillCardsWithSeedData(CARS_SEED);
    this.bransService.fillCardsWithSeedData(BRANDS_SEED);
    return 'SEED executed';
  }
}

  



