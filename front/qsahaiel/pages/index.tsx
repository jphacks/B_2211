import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { axios } from "../util/axios";

const Home: NextPage = () => {
  const inputEl = useRef(null);
  const [text, setText] = useState(<></>);

  const handleClick = () => {
    if (!inputEl.current?.value) return;
    axios.get("/grass/" + inputEl.current.value).then((res) => {
      setText(
        <>
          {res.data.map((date: [string, string]) => {
            return (
              <>
                <p key={date[0]}>{date[0] + " : " + date[1]}</p>
              </>
            );
          })}
        </>
      );
      console.log(res.data);
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Qsahaiel Top page</title>
      </Head>

      <input type="text" id="userID" required size={20} ref={inputEl}></input>
      <button onClick={handleClick}>検索</button>
      <p>{text}</p>
    </div>
  );
};

export default Home;
