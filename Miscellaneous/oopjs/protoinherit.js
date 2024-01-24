function Person(name){
    this.name //instance member
}

Person.prototype.greet = function(){ //prototype member
    console.log(`Hello, my name is ${this.name} `);
}

function Employee(name, emplopyeeID){
    this.name = name
    this.emplopyeeID = emplopyeeID
}

Employee.prototype = Object.create(Person.prototype)
Employee.prototype.constuctor = Employee

Employee.prototype.showEmpDetails = function(){
    console.log(`Hello, EmpID ${this.emplopyeeID} `);
}

let pw = new Employee("hc", "hc123")

pw.greet()
pw.showEmpDetails()