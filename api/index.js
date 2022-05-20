console.log('Hello world !')
let persons = [
    {
      name: 'Arto Hellas',
      number: '040-123456',
      id: 1
    },
    {
      name: 'Martti Tienari',
      number: '040-123456',
      id: 2
    },
    {
      name: 'Arto Jarvinen',
      number: '040-123456',
      id: 3
    },
    {
      name: 'Lea Kutvonen',
      number: '040-123456',
      id: 4
    }
  ];

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors =  require('cors')

const logger = (request,response,next) => {
    console.log('Method : ',request.method)
    console.log('Path :   ',request.path)
    console.log('Body :   ',request.body)
    console.log('--------')
    next()
}

app.use(bodyParser.json())

app.use(logger)
app.use(cors())

app.get('/api',(req,res)=>{
    res.send('<h1>Hello world !</h1>')
})

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
  //  console.log('res ->', res)
  //  console.log('req.param ->', res)

    const id=Number(req.params.id)
    const person=persons.find(person => person.id===id)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const id=Number(req.params.id);
    persons=persons.filter(person => person.id !== id)
    res.status(204).end()
})


const genrateId= ()=>{
    const genId = Math.random()*10000000
    return Math.floor(genId)
}

app.post('/api/persons',(req,res)=>{
    const body=req.body
    console.log('body ->', body)

    if (body.name === undefined || body.name.length===0){
        return res.status(400).json({error:'Name is missing !'})
    }
    if (body.number === undefined || body.number.length===0){
        return res.status(400).json({error:'Number is missing !'})
    }

    const existPerson= persons.filter(person => person.name === body.name)
    console.log('exist person',existPerson,'type', existPerson.length)
    if (existPerson.length !== 0 ){
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        name:body.name,
        number:body.number,
        id:genrateId()
    }
    console.log('new person ->')
    persons=persons.concat(person)
    console.log(person);
    res.json(person)
})



const PORT = process.env.PORT || 3001
app.listen(PORT ,()=>{
console.log(`The server are running on the port ${PORT}`)
})