function Person(name, age){
    this.name = name
    this.age = age
}

Person.prototype.greet = function(){
    console.log(`Hello, my name is ${this.name} and my age is ${this.age}`);
}

let rahul = new Person("rahul", 21)
rahul.greet()
console.log(Person.prototype);
console.log(Person.prototype.constructor);