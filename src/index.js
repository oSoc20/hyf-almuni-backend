const express = require('express');
const cors = require('cors')
const passport = require('passport');
const Db = require('./db');
const genKeyPair = require('./generateKeypair');
const logger = require('morgan')

const app = express();

// middlewares
app.use(express.json());
app.use(logger('dev'))

// generate public and private key
genKeyPair()

const PORT = process.env.PORT || 8080;

const ALMUNI = `alumni`
const COMPANY = 'company';
const SKILL = `skill`

// Alumni-CRUD actions
const
  { registerAlumni,
    loginAlumni,
    getAllAlumni,
    getAlumni,
    updateAlumni,
    createAlumniSkill,
    getAlumniSkills,
    deleteAlumni,
    getSkills,
    createSkill,
    getSkill,
    updateSkill,
    deleteSkill,
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
app.get(`/${ALMUNI}`, passport.authenticate('jwt', {session: false}), getAllAlumni);
app.get(`/${ALMUNI}/:alumniId`, passport.authenticate('jwt', {session: false}),getAlumni);
app.patch(`/${ALMUNI}/:alumniId`, passport.authenticate('jwt', {session: false}),updateAlumni);
app.delete(`/${ALMUNI}`, passport.authenticate('jwt', {session: false}), deleteAlumni);

// alumni skill routes
app.post(`/${ALMUNI}/:alumniId/${SKILL}`, passport.authenticate('jwt', {session: false}), createAlumniSkill);
app.get(`/${ALMUNI}/:alumniId/${SKILL}`, passport.authenticate('jwt', {session: false}), getAlumniSkills);

// skills
app.get(`/${SKILL}`, passport.authenticate('jwt', {session: false}), getSkills);
app.get(`/${SKILL}/:skillId`,passport.authenticate('jwt', {session: false}), getSkill);
app.post(`/${SKILL}`,passport.authenticate('jwt', {session: false}), createSkill);
app.patch(`/${SKILL}/:skillId`, passport.authenticate('jwt', {session: false}),updateSkill);
app.delete(`/${SKILL}/:skillId`,passport.authenticate('jwt', {session: false}), deleteSkill);

// company routes
app.post(`/${COMPANY}`, createCompany);
app.get(`/${COMPANY}`, getCompany);



// perhaps expose some API metadata at the root
app.get('/hello', (req, res) => {
  res.json({ greeting: 'world' });
});

app.listen(PORT, ()=> console.log(`Server runnig on port ${PORT}`))