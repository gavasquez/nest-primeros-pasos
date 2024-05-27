import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {

  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla'
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic'
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Cherokee'
    }
  ];

  findAll(){
    return this.cars;
  }

  findOneById(id: number) {
    const card = this.cars.find(card => card.id === id);
    if(!card) throw new NotFoundException(`Card with id ${id} not found`);
    return card;
  }

  

}
