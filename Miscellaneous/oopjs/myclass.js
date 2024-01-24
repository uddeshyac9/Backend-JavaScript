class Person {
    constructor(name, age){
        this.name = name
        this.age = age
    }
    organization = "Tata"
    greet(){
        console.log(`Hello, my name is ${this.name} and my age is ${this.age}`);
    }
}

// const rahul = new Person('Rahul', 21)
// rahul.greet()
// console.log(rahul.organization);

// function NewPerson(name, age){
//     this.name = name
//     this.age = age
// }

// NewPerson.prototype.greet = function(){
//     console.log(`Hello, my name is ${this.name} and my age is ${this.age}`);
// }

// const rahul = new NewPerson('Rahul', 21)
// rahul.greet()


class Animal{
    constructor(name,age){
        this.name = name
        this.age = age
    }
    greet(){
        console.log(`Hello, my name is ${this.name} and my age is ${this.age}`);
    }

}
//Inheritence
class Dog extends Animal{
    constructor(name,age, breed){
        super(name,age)
        this.breed = breed
    }
}
const lucky = new Dog("lucky",6,"Daburman" )
lucky.greet()
