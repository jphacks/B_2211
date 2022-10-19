'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';


const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

// accespt json
app.use(express.json());

// 初期値で緑色
let LEDState = [{
    "color": "#00FF00",
    "power": 100
  },
  {
    "color": "#00FF00",
    "power": 100
  },
  {
    "color": "#00FF00",
    "power": 100
  },
  {
    "color": "#00FF00",
    "power": 100
  },
  {
    "color": "#00FF00",
    "power": 100
  },
  {
    "color": "#00FF00",
    "power": 100
  },
  {
    "color": "#00FF00",
    "power": 100
  },
  {
    "color": "#00FF00",
    "power": 100
  }
]

app.post('/state', (req, res) => {
  if (req.body) {
    LEDState = req.body;
  }
  res.send('OK');
})

app.get('/state', (req, res) => {
  res.send(LEDState);
})

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});