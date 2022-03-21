import Bolt from '@slack/bolt'
import 'dotenv/config'
import PokemonController from './controller/pokemon'

const { App } = Bolt
const env = process.env

const app = new App({
  token: env.SLACK_BOT_TOKEN,
  signingSecret: env.SLACK_SIGNING_SECRET
});

app.message('pokemon', async ({ _, say }) => {
  const pokemon = new PokemonController(say);
  await pokemon.appearWildPokemon()
});

app.action('monster_ball', async ({ action, ack, say }) => {
  const pokemon = new PokemonController(say);
  await ack();
  
  const pokemonId = Number(action.value);
  await pokemon.throwMonsterBall(pokemonId);
});

app.action('give_food', async ({ action, ack, say }) => {
  const pokemon = new PokemonController(say);
  await ack();

  const pokemonId = Number(action.value);
  await pokemon.giveFood(pokemonId);
});

(async () => {
  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();