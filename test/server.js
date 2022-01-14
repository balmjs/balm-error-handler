const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.post('/log', (req, res) => {
  console.log(`report ${req.body.length}`);
  res.status(200).send('');
});

app.listen(8080, () => {
  console.log('server listen on port 8080...');
});
