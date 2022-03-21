# pokepi

## はじめかた

- ngrokのビルド
```
docker compose up -d --build ngrok
```

- node起動
```
docker compose up -d app （ -d 別になくても良いけど ）
```

- localhost: 4040へアクセスして、表示されたngrokのURLをslackAppエンドポイントに追加

## 利用方法

- はじめる（ngrokの再起動だるいので別々に起動）
```
docker compose up ngrok -d
docker compose up app
```

- nodepackageインストール
```
docker compose run --rm app npm install xxxx
```