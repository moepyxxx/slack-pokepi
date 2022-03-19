import Bolt from '@slack/bolt'
import 'dotenv/config'
import axios from 'axios'

const { App } = Bolt
const env = process.env

const app = new App({
  token: env.SLACK_BOT_TOKEN,
  signingSecret: env.SLACK_SIGNING_SECRET
});

app.message('pokemon', async ({ _, say }) => {
  const min = 252;
  const max = 386;
  const random = Math.floor( Math.random() * (max + 1 - min) ) + min ;

  await axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`)
    .then(({data}) => {
      const name = data.name;
      const imageUrl = data.sprites.front_default
      say({
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `Appear ${name} !`
            },
            "accessory": {
              "type": "image",
              "image_url": imageUrl,
              "alt_text": name
            }
          }
        ]
      });
    })
});

(async () => {
  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();