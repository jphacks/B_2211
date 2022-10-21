import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { axios } from "../util/axios";

const Home: NextPage = () => {
  const [colors, setColors] = useState<string[]>(new Array<string>(8).fill("#000000"));
  const [text, setText] = useState(<></>); //取得した草の状況もしくは取得できなかった旨のJSX
  const [grass, setGrass] = useState([]); //草の状態を格納する
  const [sent, setSent] = useState(<></>); //送信状況のJSX

  const searchID = () => {
    //入力されたGitHubIDから草の情報を取得
    const failed = () => {
      //失敗時の処理
      setGrass([]);
      setSent(<></>);
      setText(<>ユーザーが見つかりませんでした</>);
    };
    if (!inputEl.current?.value) return;
    axios
      .get("https://kusa.home.k1h.dev/grass/" + inputEl.current.value)
      .then((res) => {
        if (res.status != 200) {
          //失敗(200以外、多分catchされるけど一応)
          failed();
        } else {
          //成功(草の情報の格納、情報の表示)
          setGrass(res.data);
          setText(
            <>
              {res.data.slice(-7).map((date: [string, string]) => {
                return (
                  <>
                    <p key={date[0]}>{date[0] + " : " + date[1]}</p>
                  </>
                );
              })}
            </>
          );
        }
        console.log(res.data);
      })
      .catch((res) => {
        failed();
      });
  };
  const sendGrass = () => {
    //草の情報を送信する

    //草の情報がないケース(ボタンが表示されないはずなので多分ない)
    // if (grass.length == 0) {
    //   setSent(<>送信できません</>);
    //   return;
    // }

    //草の情報をAPI用に整形
    // const grassData = grass.slice(-8).map((date: [string, string]) => {
    //   const pow = Number(date[1]);
    //   return { color: "#00FF00", power: pow };
    // });
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
        <p className="text-center my-3">{text}</p>
        <>{sent}</>
      </div>
    </div>
  );
};

export default Home;
