"use strict";

function Figure() {
    this._name = 'Figure';

    this.toString = function () {
        return this._name;
    };
}

function Rectangle(a, b) {
    Figure.call(this);
    this._a = a;
    this._b = b;
    this._name = "Rectangle";

    this.getArea = function () {
        return this._a * this._b;
    };

    this.getPerimeter = function () {
        return this._a * 2 + this._b * 2;
    };

    this.valueOf = function () {
        return this.getArea();
    }
}

function Square(side) {
    Rectangle.call(this, side, side);
    this._name = "Square";
}

function Circle(radius) {
    Figure.call(this);
    this._a = radius;
    this._name = "Circle";

    this.getArea = function () {
        return Math.PI * Math.pow(this._a, 2);
    };

    this.getPerimeter = function () {
        return 2 * Math.PI * this._a;
    };

    this.valueOf = function () {
        return this.getArea();
    }
}

var r1 = new Rectangle(4,5);
console.log(r1);
console.log(r1.getArea());

var s1 = new Square(5);
console.log(s1);
console.log(s1.getArea());

var c1 = new Circle(1);
console.log(c1);
console.log(c1.getArea());
