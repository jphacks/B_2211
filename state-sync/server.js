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

function convertLEDFormat(ledState) {
  let outputFormat = [];
  for (let i = 0; i < ledState.length; i++) {
    let r = parseInt(parseInt(ledState[i].color.substring(1, 3), 16) * ledState[i].power / 100);
    let g = parseInt(parseInt(ledState[i].color.substring(3, 5), 16) * ledState[i].power / 100);
    let b = parseInt(parseInt(ledState[i].color.substring(5, 7), 16) * ledState[i].power / 100);
    outputFormat.push([r, g, b]);
  }
  return outputFormat;
}

app.get('/state', (req, res) => {
  res.send(convertLEDFormat(LEDState));
})

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});