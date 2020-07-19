const express = require('express');
const cors = require('cors')
const passport = require('passport');
const Db = require('./db');
const genKeyPair = require('./generateKeypair');

const app = express();
app.use(express.json());

// generate public and private key
genKeyPair()

const PORT = process.env.PORT || 8080;

const ALMUNI = `alumni`
const COMPANY = 'company';

// Alumni-CRUD actions
const
  { registerAlumni,
    loginAlumni,
    getAlumni
  } = require('./actions/almuni-actions');

// Company-CRUD actions
const {
  getCompany,
  createCompany,
} = require('./actions/company-actions');

app.get('/', (req, res)=>{
    res.send('Server is Up and runnig')
})



//Pass the global passport object into the configuaration function
require('./middleware/passport')(passport);

// This will initalize the passport object on every request
app.use(passport.initialize())

app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/protected' , passport.authenticate('jwt', {session: false}),(req, res, next) => {
  res.status(200).json({
      success: true,
      msg: 'you are authorized'
  })
});
// alumni routes 
app.post(`/${ALMUNI}/register`, registerAlumni);
app.post(`/${ALMUNI}/login`, loginAlumni);
app.get(`/${ALMUNI}`, passport.authenticate('jwt', {session: false}), getAlumni);

// company routes
app.post(`/${COMPANY}`, createCompany);
app.get(`/${COMPANY}`, getCompany);



// perhaps expose some API metadata at the root
app.get('/hello', (req, res) => {
  res.json({ greeting: 'world' });
});

app.listen(PORT, ()=> console.log(`Server runnig on port ${PORT}`))