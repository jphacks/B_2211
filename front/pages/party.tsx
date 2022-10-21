import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { axios } from "../util/axios";

const Home: NextPage = () => {
  const [colors, setColors] = useState<string[]>(new Array<string>(8).fill("#000000"));
  const [text, setText] = useState(<></>); //取得した草の状況もしくは取得できなかった旨のJSX
  const [grass, setGrass] = useState([]); //草の状態を格納する
  const [sent, setSent] = useState(<></>); //送信状況のJSX

  const rgbToHsv = (r: number, g: number, b: number) => {
    //RGBからHSVに変換
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h, s, v];
  };

  function hsvToRgb(h:number, s:number, v:number) {
    let r=0.0, g=0.0, b=0.0;
  
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return [r,g,b].map(e=>Math.round(e*255));
  }

  const getRandomColor = () => {
    const rgb = hsvToRgb(Math.random(), 0.5, 0.5);
    // rgbを#ffffffみたいな形に変換する
    const color2 = "#" + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
    return color2;
  };

interface payload {
  color: string;
  power: number;
}

  const startParty = () => {
    //草の色を変える
    
    const colors = new Array<payload>(8);
    for(let i=0;i<8;i++){
      colors[i] = {
        color: getRandomColor(),
        power: 100
      }
    }

    console.log(colors);
    
    axios
      .post("https://kusa.home.k1h.dev/state", colors)
      .then((res) => {
        if (res.status != 200) {
          //失敗(200以外、多分catchされるけど一応)
          setSent(<></>);
        } else {
          //成功
          setSent(<p>送信しました</p>);
        }
        console.log(res.data);
      }
      )
  }

  const sendGrass = () => {
    //草の情報を送信する
    let grassData = new Array<{ color: string; power: number }>(8);
    for (let i = 0; i < 8; i++) {
      grassData[i] = { color: colors[i], power: 100 };
    }

    //送信
    axios
      .post("https://kusa.home.k1h.dev/state", grassData)
      .then((res) => {
        setSent(<>送信完了しました</>);
      })
      .catch((res) => {
        setSent(<>送信中にエラーが発生しました</>);
      });
  };
  const alert = async () => {
    for(let i=0;i<10;i++){
      const black = new Array<payload>(8).fill({color: "#000000", power: 100});
      axios.post("https://kusa.home.k1h.dev/state", colors);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const red = new Array<payload>(8).fill({color: "#ff0000", power: 100});
      axios.post("https://kusa.home.k1h.dev/state", colors);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  const sendWalk = () => {
    const data = [
      {
          "color": "#FF0000",
          "power": 36
      },
      {
          "color": "#FF0000",
          "power": 18
      },
      {
          "color": "#FF0000",
          "power": 35
      },
      {
          "color": "#FF0000",
          "power": 34
      },
      {
          "color": "#FF0000",
          "power": 42
      },
      {
          "color": "#FF0000",
          "power": 5
      },
      {
          "color": "#FF0000",
          "power": 35
      },
      {
          "color": "#FF0000",
          "power": 44
      }
  ];

  //送信
  axios
  .post("https://kusa.home.k1h.dev/state", data)
  .then((res) => {
    setSent(<>送信完了しました</>);
  })
  .catch((res) => {
    setSent(<>送信中にエラーが発生しました</>);
  });
  }

  return (
    <div>
      <Head>
        <title>Qsahaiel Top page</title>
      </Head>

      <div className="h-screen flex flex-col align-middle">
        <h1 className="my-10 text-4xl text-center font-mono">Qsahaiel TestPage</h1>

        <div className="justify-center flex flex-row">
          {
            colors.map(
              (color, index) => {
                return (
                  <input 
                  type="color" 
                  id="head"
                  name="head"
                  value={color} 
                  onChange={(e)=>{
                    let temp = [...colors]
                    temp[index]=e.target.value;
                    setColors(temp)
                  }} 
                  key={`color_${index}`}
                  />
                )
              }
            )
          }
         </div>
        <button onClick={sendGrass}>送信</button>
        <button onClick={()=>{const interval = setInterval(startParty, 1000);setTimeout(()=>{clearInterval(interval)},10000);}}>パーティモード</button>
        <button onClick={sendWalk}>歩数テスト</button>
        <button onClick={alert}>アラートテスト</button>
        <p className="text-center my-3">{text}</p>
        <>{sent}</>
      </div>
    </div>
  );
};

export default Home;
