import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from "uuid";
import { UpdateCarDto, CreateCarDto } from './dto';

@Injectable()
export class CarsService {

  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla'
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic'
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee'
    }
  ];

  findAll(){
    return this.cars;
  }

  findOneById(id: string) {
    const card = this.cars.find(card => card.id === id);
    if(!card) throw new NotFoundException(`Card with id ${id} not found`);
    return card;
  }

  create(createCarDto: CreateCarDto) {

    const newCar: Car  = {
      id: uuid(),
      brand: createCarDto.brand,
      model: createCarDto.model
    }

    this.cars.push(newCar);
    return newCar;
  }

  update(id: string,updateCarDto: UpdateCarDto){
    let cardDB = this.findOneById(id);
    if(updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException(`Car id is not valid inside body`)
    this.cars = this.cars.map(car => {
      if( car.id === id){
        cardDB = {
          ...cardDB,
          ...updateCarDto,
          id,
        }
        return cardDB;
      }
      return car;
    })

    return cardDB; // TODO: update car
  }

  delete(id: string) {
    const car = this.findOneById(id);
    if(!car) throw new NotFoundException(`Car with id ${id} not found`);
    this.cars = this.cars.filter(car => car.id !== id);
    return {
      ok: true,
      message: 'Car eliminado'
    };
  }
}
