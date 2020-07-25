const express = require('express');
const cors = require('cors')
const Db = require('./db');
const genKeyPair = require('./generateKeypair');
const logger = require('morgan')
const alumniPassport = require('passport');
const companyPassport = require('passport');

const app = express();
// generate public and private key
genKeyPair()

const alumnus = require('./routes/alumunus')
const skills = require('./routes/skills')
const languages = require('./routes/lanugages')
const media = require('./routes/media')
const company = require('./routes/companies');

// middlewares
app.use(express.json());
app.use(logger('dev'))
app.use(express.urlencoded({extended: true}));
app.use(cors());

const auth = alumniPassport.authenticate('alumni-rule', {session: false})
//Routes
app.use('/alumni', alumnus)
app.use('/skill',auth, skills)
app.use('/language',auth, languages)
app.use('/media', auth,media)
app.use('/company', company)

app.get('/', (req, res, next)=>{
  res.send('Server is Up and runnig')
})

//Pass the global passport object into the configuaration function
require('./middleware/passport')(alumniPassport);
// This will initalize the passport object on every request
app.use(alumniPassport.initialize())

// catch 404 errors and forward them to error handler functions
app.use((req, res, next)=>{
  const err = new Error('Not Found')
  err.status = 404;
  next(err)
})

// Error handler function
app.use((err, req, res, next)=> {
  const error = app.get('env') === 'development' ? err: {}
  const status = err.status || 500;

  // Response to client
  res.status(status).json({
    error:{
      message: error.message
    }
  })
  // Respond to our server
  console.error(err)
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> console.log(`Server runnig on port ${PORT}`))