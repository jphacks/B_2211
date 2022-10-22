import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { axios } from "../util/axios";
import Image from "next/image";
import logo from "../public/logo.png";

const Home: NextPage = () => {
  const inputEl = useRef<HTMLInputElement>(null); //input
  const [text, setText] = useState(<></>); //取得した草の状況もしくは取得できなかった旨のJSX
  const [grass, setGrass] = useState([]); //草の状態を格納する
  const [sent, setSent] = useState(<></>); //送信状況のJSX
  const [maxGrass, setMaxGrass] = useState(1); //過去1年の草最大値

  const searchID = () => {
    //入力されたGitHubIDから草の情報を取得
    const failed = () => {
      //失敗時の処理
      setGrass([]);
      setSent(<></>);
      setText(<>ユーザーが見つかりませんでした</>);
      setMaxGrass(1);
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
          const grasses = res.data.map((date: [string, string]) => {
            return Number(date[1]);
          });
          const sum = (nums: number[]) => {
            var total = 0;
            for (var i = 0, len = nums.length; i < len; i++) total += nums[i];
            return total;
          };
          const mxgrs = sum(grasses) == 0 ? 1 : Math.max(...grasses);
          setMaxGrass(mxgrs);

          setText(
            <>
              {res.data.slice(-8).map((date: [string, string]) => {
                return (
                  <>
                    <p key={date[0]}>
                      {date[0] +
                        " : " +
                        date[1] +
                        "(" +
                        Math.floor((Number(date[1]) / mxgrs) * 100) +
                        "%)"}
                    </p>
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

  const sendSahaQuielGrass = () => {
    //草の情報がないケース(ボタンが表示されないはずなので多分ない)
    if (grass.length == 0) {
      setSent(<>送信できません</>);
      return;
    }
    const colorPallet = [
      "#ff5f11",
      "#ffff1c",
      "#42c31d",
      "#ca1212",
      "#42c31d",
      "#ffff1c",
      "#ff5f11",
      "#1034a8",
    ];
    //草の情報をAPI用に整形
    let index = 0;
    const grassData = grass.slice(-8).map((date: [string, string]) => {
      const pow = Number(date[1]);
      return {
        color: colorPallet[index++],
        power: Math.floor((pow / maxGrass) * 100),
      };
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

  const sendGrass = () => {
    //草の情報を送信する

    //草の情報がないケース(ボタンが表示されないはずなので多分ない)
    if (grass.length == 0) {
      setSent(<>送信できません</>);
      return;
    }

    //草の情報をAPI用に整形
    const grassData = grass.slice(-8).map((date: [string, string]) => {
      const pow = Number(date[1]);
      return { color: "#00FF00", power: Math.floor((pow / maxGrass) * 100) };
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

  const sendDummyWalkingGrass = () => {
    const dummy = [
      {
        color: "#FF0000",
        power: 36,
      },
      {
        color: "#FF0000",
        power: 18,
      },
      {
        color: "#FF0000",
        power: 35,
      },
      {
        color: "#FF0000",
        power: 34,
      },
      {
        color: "#FF0000",
        power: 42,
      },
      {
        color: "#FF0000",
        power: 5,
      },
      {
        color: "#FF0000",
        power: 35,
      },
      {
        color: "#FF0000",
        power: 44,
      },
    ];

    //送信
    axios
      .post("https://kusa.home.k1h.dev/state", dummy)
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
        <div className="flex flex-row justify-center">
          <div className="w-15 h-15 my-10">
            <Image
              src={logo}
              layout="fixed"
              width={80}
              height={80}
              alt="qsahaiel logo"
            />
          </div>
          <h1 className="my-10 text-7xl text-center font-mono">Qsahaiel</h1>
        </div>
        <div className="justify-center  flex flex-row">
          <input
            type="text"
            id="userID"
            required
            size={20}
            ref={inputEl}
            className=" block p-4 w-3/5 text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
          <button
            onClick={searchID}
            className="bg-green-700 hover:bg-green-600 text-white rounded-r-lg px-8 py-2"
          >
            検索
          </button>
        </div>
        <p className="text-center my-3">{text}</p>
        <div>
          {grass.length != 0 ? (
            <div className="flex flex-col">
              <div className="flex flex-row justify-center">
                <button
                  onClick={sendGrass}
                  className="bg-green-700 hover:bg-green-600 text-white rounded-lg px-4 py-2  my-4 w-64 "
                >
                  草の情報を送信
                </button>
              </div>
              <div className="flex flex-row justify-center">
                <button
                  onClick={sendDummyWalkingGrass}
                  className="text-center  bg-red-800 hover:bg-red-400 text-white rounded-lg px-4 py-2 my-4 w-64 "
                >
                  歩数データ(ダミー)を送信
                </button>
              </div>
              <div className="flex flex-row justify-center">
                <button
                  onClick={sendSahaQuielGrass}
                  className="item-center bg-red-600 hover:bg-red-300 text-white rounded-lg px-4 py-2  my-4 w-64 "
                >
                  サハクイエルモード
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <>{sent}</>
      </div>
    </div>
  );
};

export default Home;
