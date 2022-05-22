const express = require('express');
const path = require('path');
require('dotenv').config()
const cors = require('cors')
mongoose = require('mongoose');
const {checkAuth} = require('./helper/verify')
const port = 3008;
const app = express();
app.use(cors({origin: '*'}));

const uri = `mongodb+srv://Agenda:${process.env.PASS}@cluster0.3bkwg.mongodb.net/${process.env.US}?retryWrites=true&w=majority`


const taskRouter = require('./routes/task');
const userTask = require('./routes/user')


mongoose.connect(uri)
.then(()=>{console.log('conectados')})
.catch((err)=>{console.log(err)})



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/task', checkAuth, taskRouter);
app.use('/user', userTask);

app.listen(process.env.PORT || port, ()=>{
  console.log(`escuchando en el puerto ${port}`)
})

module.exports = app;
