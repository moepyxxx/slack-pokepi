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
          }, {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "emoji": true,
                  "text": "MonsterBall"
                },
                "style": "primary",
                "action_id": "monster_ball"
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "emoji": true,
                  "text": "GiveFood"
                },
                "style": "primary",
                "action_id": "give_food"
              }
            ]
          }
        ]
      });
    })
});

app.action('monster_ball', async ({ body, ack, say }) => {
  await ack();
  await say('Request approved 👍 monster ball!');
});

app.action('give_food', async ({ body, ack, say }) => {
  await ack();
  await say('Request approved 👍 give food!');
});

(async () => {
  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();