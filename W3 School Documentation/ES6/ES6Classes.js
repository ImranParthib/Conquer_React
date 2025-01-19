//!A class is a type of function, but instead of using the keyword function to initiate it, we use the keyword class, and the properties are assigned inside a constructor() method.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Car = /** @class */ (function () {
    function Car(name, speed) {
        this.name = name;
        this.speed = speed;
    }
    return Car;
}());
var car1 = new Car("BMW", 100);
var car2 = new Car("Audi", 200);
console.log(car1.name, car1.speed);
console.log(car2.name, car2.speed);
// Explanation: In the above code, we have created a class Car with a constructor that takes two parameters name and speed. We have created two objects car and car1 of class Car. We have passed the name and speed of the car to the constructor while creating the object. We have printed the name of the car using the object. The output of the above code will be: BMW Audi
/*
 * Method in Classes
 */
var Bus = /** @class */ (function () {
    function Bus(name, speed) {
        this.name = name;
        this.speed = speed;
    }
    Bus.prototype.drive = function () {
        return "".concat(this.name, " is driving at ").concat(this.speed, " km/hr");
    };
    return Bus;
}());
var bus1 = new Bus("Volvo", 80);
console.log(bus1.drive());
// Explanation: In the above code, we have created a class Bus with a constructor that takes two parameters name and speed. We have created a method drive() that returns the name of the bus and the speed at which it is driving. We have created an object bus1 of class Bus. We have called the drive() method using the object. The output of the above code will be: Volvo is driving at 80 km/hr
/*
 * Class Inheritance
 */
var Vehicle = /** @class */ (function () {
    function Vehicle(name, speed) {
        this.name = "";
        this.speed = 0;
        this.name = name;
        this.speed = speed;
    }
    Vehicle.prototype.drive = function () {
        return "".concat(this.name, " is driving at ").concat(this.speed, " km/hr");
    };
    return Vehicle;
}());
var CNG = /** @class */ (function (_super) {
    __extends(CNG, _super);
    function CNG(name, speed, wheels) {
        var _this = _super.call(this, name, speed) || this;
        _this.wheels = 0;
        _this.wheels = wheels;
        return _this;
    }
    CNG.prototype.drive = function () {
        return "".concat(this.name, " is driving at ").concat(this.speed, " km/hr with ").concat(this.wheels, " wheels");
    };
    return CNG;
}(Vehicle));
var car5 = new CNG("BD_CNG", 100, 3);
console.log(car5.drive());
// Explanation: In the above code, we have created a class Vehicle with a constructor that takes two parameters name and speed. We have created a method drive() that returns the name of the vehicle and the speed at which it is driving. We have created a class CNG that extends the Vehicle class. We have created a constructor that takes three parameters name, speed, and wheels. We have called the super() method to call the constructor of the parent class. We have created a method drive() that returns the name of the vehicle, the speed at which it is driving, and the number of wheels. We have created an object car5 of class CNG. We have called the drive() method using the object. The output of the above code will be: BMW is driving at 100 km/hr with 3 wheels
/*
 * Static Methods
 */
var StaticMethod = /** @class */ (function () {
    function StaticMethod(name) {
        this.name = "";
        this.name = name;
    }
    StaticMethod.display = function () {
        return "This is a static method";
    };
    return StaticMethod;
}());
var staticMethod = new StaticMethod("Static Method");
console.log(StaticMethod.display());
// Explanation: In the above code, we have created a class StaticMethod with a constructor that takes one parameter name. We have created a static method display() that returns a string. We have created an object staticMethod of class StaticMethod. We have called the static method display() using the class name. The output of the above code will be: This is a static method
/*
 * Getters and Setters
 */
var GetterSetter = /** @class */ (function () {
    function GetterSetter(name) {
        this.name = "";
        this.name = name;
    }
    Object.defineProperty(GetterSetter.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetterSetter.prototype, "setName", {
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    return GetterSetter;
}());
var getterSetter = new GetterSetter("GetterSetter");
console.log(getterSetter.getName);
getterSetter.setName = "GetterSetter Updated";
console.log(getterSetter.getName);
// Explanation: In the above code, we have created a class GetterSetter with a constructor that takes one parameter name. We have created a getter getName() that returns the name of the object. We have created a setter setName() that sets the name of the object. We have created an object getterSetter of class GetterSetter. We have called the getter getName() using the object. We have called the setter setName() using the object. We have called the getter getName() using the object. The output of the above code will be: GetterSetter GetterSetter Updated
