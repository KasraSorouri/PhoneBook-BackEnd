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
//const bodyParser = require('body-parser')

//app.use(bodyParser.json())

app.get('/api',(req,res)=>{
    res.send('<h1>Hello world !</h1>')
})

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
    console.log('res ->', res)
    console.log('req.param ->', res)

    const id=Number(req.params.id)
    const person=persons.find(person => person.id===id)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})
/*
app.delete('/persons/:id',(req,res)=>{
    const id=Number(req.params.id);
    notes=notes.filter(note => note.id !== id)
    res.status(204).end()
})

const genrateId= ()=>{
    const maxId = notes.length > 0 ? notes.map(note => note.id).sort((a,b) => a - b ).reverse()[0] : 1
    return maxId+1
}

app.post('/notes',(req,res)=>{
    const body=req.body
    if (body.content === undefined ){
        return res.status(400).json({error:'content missing !'})
    }
    const note = {
        content:body.content,
        important:body.important || false,
        date: new Date(),
        id:genrateId()
    }
    console.log('new Note ->')
    notes=notes.concat(note)
    console.log(note);
    res.json(note)
})

*/

const port=3001
app.listen(port ,()=>{
console.log(`The server are running on the port ${port}`)
})