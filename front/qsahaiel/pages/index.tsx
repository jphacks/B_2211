import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { axios } from "../util/axios";

const Home: NextPage = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(<></>);
  const [grass, setGrass] = useState([]);

  const searchID = () => {
    if (!inputEl.current?.value) return;
    axios
      .get("https://kusa.home.k1h.dev/grass/" + inputEl.current.value)
      .then((res) => {
        if (res.status != 200) {
          setGrass([]);
          setText(<>ユーザーが見つかりませんでした</>);
        } else {
          setGrass(res.data);
          setText(
            <>
              {res.data.slice(-10).map((date: [string, string]) => {
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
        setGrass([]);
        setText(<>ユーザーが見つかりませんでした</>);
      });
  };

  const sendGrass = () => {
    //ここに草の情報を送信する処理
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
          <button onClick={sendGrass}>ここを押したら草の情報を送信する</button>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default Home;
