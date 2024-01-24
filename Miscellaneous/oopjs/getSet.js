class Person{
    constructor(name, age){
        this.name = name;
        this._age = age;
    }

    get age(){
        return this._age + 5
    }

    set age(value){
        if (value > 0) {
            this._age = value
        }else {
            console.log('Invalid age');
        }
    }

}

const john = new Person('John', 25)

console.log(john._age);
console.log(john.age);
