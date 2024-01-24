function Person(name, age) {
    this.name = name
    let _age = age //private Variable
    this.greet = function() {
        console.log(`Name: ${name} Age: ${_age}`);
    }
    this.getAge = function() {
        return _age
    }
}

let john = new Person("john", 21)
console.log(john.getAge());