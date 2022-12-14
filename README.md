# Qsahaiel(クサハエル)

[![IMAGE ALT TEXT HERE](https://user-images.githubusercontent.com/63544513/197244477-cd92702d-1dc1-4da6-ade7-4f1d58f7f0c1.png)](https://youtu.be/up1Y-pL-e3A)
デモ動画は[こちら](https://youtu.be/up1Y-pL-e3A)です。

DEMO UI(GitHubユーザーネームを入れると草を表示): https://kusa.home.k1h.dev

Test Page(カスタムカラーなど): https://kusa.home.k1h.dev/test

## 製品概要
### 背景(製品開発のきっかけ、課題等）
  GitHubのプロフィールなどには、日毎の活動量を示す（GitHubでは活動量を示すマスが緑色であるため）"草"と呼ばれているカレンダーのようなものがあり、"草を生やす"(活動をしてカレンダーに反映させる)ことが一種のモチベーションになっている人も多いでしょう。しかし、何かと忙しい日々にはそもそも"草"をチェックし忘れ、どうしても活動が途切れてしまうことも多いと思います。そこで、私たちはこの草をリアルなインテリアとして置くことができれば、ふとした瞬間に目に入り、今日やってないことを思い出したり、毎日継続できている達成感を感じられるのではないかと考えました。
  これは一般的な日課にも言えることで、そもそも日課の存在を忘れてしまう、1回途切れてしまうとモチベーションが切れてしまう、などといった問題が存在します。GitHubへのコミットだけでなく、こういった日課の継続もサポートすべく、日課の管理をするアプリケーションとその達成度を表す"草"のインテリアを制作することになりました。プロダクト名はサハクィエル（sahaquiel）からです。

### 製品説明（具体的な製品の説明）
![readme01](https://user-images.githubusercontent.com/63544513/197308223-adba8c0a-d814-405e-9255-39f1a731ed4f.png)

### 特長
#### 1. 特長1　光で達成度を可視化
GitHubのContribution、日々の歩数などの日常の達成度を、どの程度光っているかで簡単に確認することができます。
#### 2. 特長2　インテリアとしてさりげなく部屋に
Qsahaielはインテリアです。そのため、部屋にあっても違和感がありません。
部屋をおしゃれにしつつ、達成度を確認できます。
#### 3. 特長3　色のモードを変えて気分転換も
達成度を確認することは大切です。しかし、それだけでは疲れてしまいます。
Qsahaielは色の光り方のモードがいくつかあり、気分転換ができます。
##### パーティーモード
さまざまな色に光ります。
見ているだけで楽しい気分になります。

![party_qsahaiel](https://user-images.githubusercontent.com/63544513/197319746-9680494c-219f-4ad6-88ba-21a13afeac20.gif)

##### アラートモード
Qsahaielが赤色に点滅します。
自身に緊迫感を与えることができます。

![arart_qsahaiel](https://user-images.githubusercontent.com/63544513/197319764-b9e00404-99c1-4799-a582-161af93a0397.gif)

##### サハクィエルモード
Qsahaielの名前の元になったサハクィエルの配色に光ります。

<img src="https://user-images.githubusercontent.com/63544513/197319786-9384c9e1-894a-4541-975f-cdcde2eabeaa.jpg" width="320px">

##### カスタマイズモード
色を元々あるパターンだけでなく、自分の好きなように変えることができます。

<img src="https://user-images.githubusercontent.com/63544513/197318912-473057b7-efa8-4ab6-81d4-302f94afa9cd.jpg" width="320px">

### 解決出来ること
  日常的にGitHubのContributionの状況や、日課の達成状況が目に入る場所にあることで、日課の達成を促すとともにモチベーション向上に繋げることができます。

### 今後の展望
* GitHubのContributionの記録を、毎日自動で更新できるようにする。
* Google Fitなどの歩数を手動で入力することなく、自動でQsahaielが受け取り表示できるようにする。

### 注力したこと（こだわり等）
* Qsahaielは手軽に扱えるようにしました。そのため、セットアップはWi-Fiに繋ぐだけです。そこからサイトでGitHubのユーザ名を入力するだけで使えます。
* Qsahaielはインテリアです。あくまでそこも重視し、さまざまなモードを搭載することで多種多様な部屋に馴染むようにしました。


## 開発技術
### 活用した技術
#### API・データ
* Github (Contributions)

#### フレームワーク・ライブラリ・モジュール
##### フロントエンド
* Next.js
* tailwind
##### バックエンド
* FastAPI
* Express
##### 組み込み
* Arduino
* ArduinoJSON
##### インフラ
* traefik
* ArgoCD
* Docker
* k8s

#### デバイス
* ESP32-DevKitC
* Arduino MEGA 2560 R3

### 独自技術
#### ハッカソンで開発した独自機能・技術
* I2Cによる2デバイス間の連携(https://github.com/jphacks/B_2211/blob/develop/hardware/espcode/espcode.ino)
* traefikによるリバースプロキシ(https://github.com/jphacks/B_2211/blob/develop/docker-compose.yml)
