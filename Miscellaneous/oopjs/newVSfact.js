//this creates constructor 
function Person(name,age) {
    this.name = name,
    this.age = age
    console.log(this);
}
Person.prototype.greet = function() {
    console.log(`Name: ${this.name} Age: ${this.age}`);
}
 //what new keyword do 
 //new = {} , {} => prototype, this bind , return {}
let Uddeshya = new Person("Uddeshya",23)
//  Uddeshya.greet()
 let Harshul = new Person("Harshul",23)




 // foctory method
//  function factoryPerson(name,email) {
//   return {
//     name : name,
//     email: email,
//     greet : function() {
//         console.log(`Name: ${name} email: ${email}`);
//   }

//     }
  
// }
// let Ud =  factoryPerson("Ud","ud@gmail.com")
// Ud.greet()
 