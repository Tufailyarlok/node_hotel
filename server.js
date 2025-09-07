const express = require('express');
const app = express();
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const personRoutes = require('./routes/personRoutes');


const menuRoute = require('./routes/menuRoutes');
app.use('/menu', menuRoute);



app.use('/person', personRoutes);


app.get('/', function (req,res){
  res.send('welcome to my hotel');
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
