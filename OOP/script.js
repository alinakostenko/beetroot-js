"use strict";

function Figure() {
    this._name = 'Figure';
}

Figure.prototype.toString = function () {
    return this._name;
};


function Rectangle(a, b) {
    this._a = a;
    this._b = b;
    this._name = "Rectangle";
}

Rectangle.sayHello = function () {
    alert('Hello');
};

Rectangle.prototype = Object.create(Figure.prototype);
Rectangle.prototype.getArea = function () {
    return this._a * this._b;
};
Rectangle.prototype.getPerimeter = function () {
    return this._a * 2 + this._b * 2;
};
Rectangle.prototype.valueOf = function () {
    return this.getArea();
};


function Square(side) {
    Rectangle.call(this, side, side);
    this._name = "Square";
}

Square.prototype = Object.create(Rectangle.prototype);



function Circle(radius) {
    this._a = radius;
    this._name = "Circle";
}

Circle.prototype = Object.create(Figure.prototype);
Circle.prototype.getArea = function () {
    return Math.PI * Math.pow(this._a, 2);
};
Circle.prototype.getPerimeter = function () {
    return 2 * Math.PI * this._a;
};
Circle.prototype.valueOf = function () {
    return this.getArea();
};

Rectangle.sayHello();
var r1 = new Rectangle(4,5);
console.log(r1);
console.log(r1.getArea());

var s1 = new Square(5);
console.log(s1);
console.log(s1.getArea());

var c1 = new Circle(1);
console.log(c1);
console.log(c1.getArea());

