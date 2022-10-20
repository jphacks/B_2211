import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { axios } from "../util/axios";

const Home: NextPage = () => {
  const inputEl = useRef<HTMLInputElement>(null); //input
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
    if(grass.length==0){
      setSent(<>送信できません</>)
      return 
    }

    //草の情報をAPI用に整形
    const grassData = grass.slice(-7).map((date: [string, string]) => {
      const pow = Number(date[1]);
      return { color: "#00FF00", power: pow };
    });


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
    <div className={styles.container}>
      <Head>
        <title>Qsahaiel Top page</title>
      </Head>

      <input type="text" id="userID" required size={20} ref={inputEl}></input>
      <button onClick={searchID}>検索</button>
      <p>{text}</p>
      <>
        {grass.length != 0 ? (
          <button onClick={sendGrass}>草の情報を送信</button>
        ) : (
          <></>
        )}
      </>
      <>{sent}</>
    </div>
  );
};

export default Home;
