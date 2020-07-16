const express = require('express');
const cors = require('cors')
const Db = require('./db')

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const ALMUNI = `almuni`
const COMPANY = 'company';

const
  { getAlumni,
    createAlumni,
  } = require('./actions/almuni-actions');

const {
  getCompany,
  createCompany,
} = require('./actions/company-actions');

app.get('/', (req, res)=>{
    res.send('Server is Up and runnig')
})

// Company-CRUD actions
app.post(`/${COMPANY}`, createCompany);
app.get(`/${COMPANY}`, getCompany);

// Alumni-CRUD actions
app.post(`/${ALMUNI}`, createAlumni);
app.get(`/${ALMUNI}`, getAlumni);

// perhaps expose some API metadata at the root
app.get('/hello', (req, res) => {
  res.json({ greeting: 'world' });
});

app.listen(PORT, ()=> console.log(`Server runnig on port ${PORT}`))