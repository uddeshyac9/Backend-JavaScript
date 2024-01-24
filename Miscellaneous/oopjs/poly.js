class Animal{
    constructor(name){
        this.name = name
    }

    makeSound(){
        console.log("Some sound");
    }
}

class Dog extends Animal{
    constructor(name, breed){
        super(name)
        this.breed = breed
    }
    makeSound(){
        console.log("Woof woof");
    }
}
class Cat extends Animal{
    constructor(name, color){
        super(name)
        this.color = color
    }
    makeSound(){
        console.log("Meow");
    }
}

const generic = new Animal("Gen")
const ted = new Dog("ted", "GR")
const tom = new Cat("TOM", "white")

generic.makeSound()
tom.makeSound()
ted.makeSound()