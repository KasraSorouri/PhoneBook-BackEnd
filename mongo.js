const mongoose = require('mongoose')

const url = 'mongodb+srv://fs2022:fs2022@cluster0.bzwcs.mongodb.net/phonebook-cli'

mongoose.connect(url)

const Person = mongoose.model('Person',{
    name:String,
    number:String
})

//console.log('name :  ',process.argv[2])
//console.log('phone : ',process.argv[3])

const pName = process.argv[2]
const pNumber = process.argv[3]


if (pName == undefined){
    Person
        .find({})
        .then(res =>{
            console.log('puhelinluettelo:')
            res.forEach(person =>{
                console.log(person.name,person.number)
            })
        mongoose.connection.close()
        })
}
if (pName !== undefined ){
    if (pNumber == undefined){
        console.log('some Data is missing !')
        console.log('the programe needs 2 parameters Name & number')
        mongoose.connection.close()
    }else{
    const person = new Person({
        name : pName,
        number : pNumber
    })
    person
        .save()
        .then(res =>{
            console.log(`adding person ${res.name} number ${res.number} to the directory`)
            mongoose.connection.close()
        })
    }
}
