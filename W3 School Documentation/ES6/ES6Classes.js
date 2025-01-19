//!A class is a type of function, but instead of using the keyword function to initiate it, we use the keyword class, and the properties are assigned inside a constructor() method.

class Car {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }
}

let car1 = new Car("BMW", 100);
let car2 = new Car("Audi", 200);
console.log(car1.name, car1.speed);
console.log(car2.name, car2.speed);

// Explanation: In the above code, we have created a class Car with a constructor that takes two parameters name and speed. We have created two objects car and car1 of class Car. We have passed the name and speed of the car to the constructor while creating the object. We have printed the name of the car using the object. The output of the above code will be: BMW Audi

/*
 * Method in Classes
 */
class Bus {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }
  drive() {
    return `${this.name} is driving at ${this.speed} km/hr`;
  }
}

let bus1 = new Bus("Volvo", 80);
console.log(bus1.drive());

// Explanation: In the above code, we have created a class Bus with a constructor that takes two parameters name and speed. We have created a method drive() that returns the name of the bus and the speed at which it is driving. We have created an object bus1 of class Bus. We have called the drive() method using the object. The output of the above code will be: Volvo is driving at 80 km/hr

/*
 * Class Inheritance
 */

class Vehicle {
    constructor(name, speed) {
        this.name = name;
        this.speed = speed;
    }
    drive() {
        return `${this.name} is driving at ${this.speed} km/hr`;
    }
}
    
class CNG extends
Vehicle {
    constructor(name, speed, wheels) {
        super(name, speed);
        this.wheels = wheels;
    }
    drive() {
        return `${this.name} is driving at ${this.speed} km/hr with ${this.wheels} wheels`;
    }
}

let car5 = new CNG("BD_CNG", 100, 3);
console.log(car5.drive());

// Explanation: In the above code, we have created a class Vehicle with a constructor that takes two parameters name and speed. We have created a method drive() that returns the name of the vehicle and the speed at which it is driving. We have created a class CNG that extends the Vehicle class. We have created a constructor that takes three parameters name, speed, and wheels. We have called the super() method to call the constructor of the parent class. We have created a method drive() that returns the name of the vehicle, the speed at which it is driving, and the number of wheels. We have created an object car5 of class CNG. We have called the drive() method using the object. The output of the above code will be: BMW is driving at 100 km/hr with 3 wheels