import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza.service';

interface PizzaToppingDisplay {
  name: string;
  price: number;
  checked: boolean;
}

@Component({
  selector: 'app-pizza-toppings',
  templateUrl: './pizza-toppings.component.html',
  styleUrls: ['./pizza-toppings.component.css']
})
export class PizzaToppingsComponent implements OnInit {

  // Magic DI... Dependency injection...
  constructor(
    private pizzaSvc: PizzaService
  ) { }

  availablePizzaToppings: PizzaToppingDisplay[] = [];

  ngOnInit(): void {

    const pt = this.pizzaSvc.getPizzaToppingsFromTheCloud();
    console.log(pt);

    this.availablePizzaToppings = pt.map(
      x => ({
        ...x
        , checked: false
      })
    );

    console.log(this.availablePizzaToppings);
  }

  // Getter property that accesses pizza toppings, filters to only checked
  // Then reduces those into a sum value to be returned "this.available..."
  get totalPrice() {
    return this.availablePizzaToppings
      .filter(x => x.checked) // only checked boxes
      .reduce(
        (acc, x) => acc + x.price
        , 0
      )
    ;
  }

  //Method to map listed toppings to all be checked 
  checkAll = () => this.availablePizzaToppings = this.availablePizzaToppings.map(
    x => ({
      ...x
      , checked: true
    })
  );

    //Method to map listed toppings to all be unchecked 
    uncheckAll = () => this.availablePizzaToppings = this.availablePizzaToppings.map(
      x => ({
        ...x
        , checked: false
      })
    );
}
