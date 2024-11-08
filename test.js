'use strict';
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.introduceYourself = function () {
    console.log(`Hello. Name - ${this.name}. Age - ${this.age}`);
    return this;
};

Person.prototype.welcomeAnotherPerson = function(person) {
    if (person instanceof Person) {
        console.log(`Other. Name - ${person.name}. Age - ${person.age}`);
    }
    else {
        console.log("Not person object")
    }
    return person;
    // return this;
};

const firstPerson = new Person("john",30);
const secondPerson = new Person('Jane',25);

firstPerson.introduceYourself().welcomeAnotherPerson(secondPerson).introduceYourself().welcomeAnotherPerson(firstPerson);
firstPerson.welcomeAnotherPerson(firstPerson);

console.log(secondPerson);

const arr = [1, 2, 3, 2, 3, 4, 6, 5, 2, 6, 7]
console.dir(Array)
console.dir(arr)
Array.prototype.unique = function () {
    return [...new Set(this)];
};

console.log(arr.unique());

function Student(name, age, course) {
    Person.call(this, name, age)
    this.course = course;
};

Student.prototype = Object.create(Person.prototype);

const student = new Student("Jack", 12, 'JS');
console.log(student);
Student.prototype.introduceYourself = function() {
    this.__proto__.introduceYourself();
    Person.prototype.introduceYourself.call(this);
    console.log(`Student. Name - ${this.name}. Age - ${this.age}. Course - ${this.course}`);
};
student.introduceYourself();