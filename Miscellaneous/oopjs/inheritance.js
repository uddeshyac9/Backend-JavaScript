class Student{
    constructor(name,age,marks){
        this.name = name
        this.age = age
        this.marks = marks
    }
    hello(){
        console.log(`Hello, my name is ${this.name} and my age is ${this.age} and my marks is ${this.marks}`);
    }

}
const Uddeshya = new Student("Uddeshya",23,33)

//Inheritence
class Teacher extends Student{
    constructor(name,age, subject){
        super(name,age)
        this.subject = subject
    }
    hello(){
        console.log(`Hello, my name is ${this.name} and my age is ${this.age} and my Subject is ${this.subject}`);
    }
}
const Sanjay = new Teacher("Sanjay",45,"Maths")
Sanjay.hello()
Uddeshya.hello()
console.log(Sanjay.hello === Uddeshya.hello);