require('dotenv').config();

let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// create model
let Schema = mongoose.Schema;

let personSchema =  new Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods : [String]
});

let Person = mongoose.model('Person', personSchema);

// create and save person on base of model
var createAndSavePerson = function(done){ // ejemplo1(fn) 
    var jhona = new Person({
      name: "jhonatan",
      age: 11,
      favoriteFoods: ["eggs", "uva"]
    });
   
   jhona.save(function(err, datos){ //"datos" asi yo le puse
     if(err){ 
       console.log(err);
     }
     else{
     done(null, datos); // fn()
     }
   });
    
};

//metodo "create" es parecido a "save" pero se llama directamente del modelo y no de la instancia del modelo
var arrayOfPeople = [
  {name: "jhonatan",age: 11,favoriteFoods: ["eggs", "uva"]},
  {name: "viktorique",age: 12,favoriteFoods: ["eggs", "uva"]}
]

var createManyPeople = function(arrayOfPeople,done){
   Person.create(arrayOfPeople, function(err, gente ){ 
     if(err){
       console.log(err);
     }
     else{
       done(null,gente);
     }
   });
};


// find method
const findPeopleByName = (personName, done) => { //ejemplo1(key,fn) where key is a key "pers.name" argument. and "fn" it means (done) is anonime function setting as a param in exectute "findByName" function inside of server.js file   
  Person.find({name: personName},(error, personFound) =>{
    if(error){
      console.log(error);
    }
    else{
      done(null,personFound); // execute anonime function fn(key,fn) but with its own params in this case, "null" param is first argument "err" in anonime funtion of findname function, and "personFound" param is the second argument "data" in anonime function of findname function too. 
    }
  });
  
};

//method findone use
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(error, food)=>{
    if (error) return console.error(err)

    done(null,food);
  });
  
};

//use of method findById
const findPersonById = (personId, done) => {
  Person.findById({_id:personId},function(err,personId){
    if (err) return console.error(err)
    done(null,personId)
  });
  
};

//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {

  const foodToAdd = "hamburger"; // element to add

  // .findById() method to find a person by _id with the parameter personId as search key.
  Person.findById(personId, (err,person)=>{
    if(err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the findById callback - save() the updated Person.
    person.save((err,updatePerson)=>{
     if(err) return console.log(err);
     done(null, updatePerson);
    });
  });
};

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err, personName)=>{
   if(err) return console.log(err);  
    done(null,personName);  
  });
 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},function(err,personId){
  if(err) return console.log(err)
  done(null, personId)
  });
  
};

//remove method
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove(
      {name: nameToRemove},
      (err, data) => err ? done(err) : done(null, data) // other method to do the same
  );
};

//Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => { 
  Person.find({favoriteFoods: "burrito"})
        .sort({name: "asc"})
        .limit(2)
        .select({age: 0})
        .exec((error, searchResults)=>{
          done(error, searchResults);
        });  

  done(null /*, data*/);
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------


exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;


