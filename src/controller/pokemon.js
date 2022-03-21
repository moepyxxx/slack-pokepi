import { HOUEN_MAX_ZUKAN_NO, HOUEN_MIN_ZUKAN_NO } from "../constant";
import OwnPokemon from "../model/ownPokemon";
import PokemonModel from "../model/pokemon";
import PokemonView from "../view/pokemon";
import PokeApi from "./pokeApi";

class PokemonController {

  view;
  ownPokemon;
  pokeApi;

  /**
   * Boltの関数
   */
  say;

  constructor(say) {
    this.view = new PokemonView();
    this.pokeApi = new PokeApi();
    this.ownPokemon = new OwnPokemon();

    this.say = say;
  }
  
  async appearWildPokemon() {
    const randomPokemonId = Math.floor( Math.random() * (HOUEN_MAX_ZUKAN_NO + 1 - HOUEN_MIN_ZUKAN_NO) ) + HOUEN_MIN_ZUKAN_NO;

    const pokemon = await this.pokeApi.getPokemon(randomPokemonId);
    this.pokemon = new PokemonModel(pokemon);

    return await this.say(this.view.appear(
      this.pokemon.name,
      this.pokemon.imageUrl,
      this.pokemon.id
    ));
  }

  async throwMonsterBall(userId, pokemonId) {
    const pokemon = await this.pokeApi.getPokemon(pokemonId);
    this.pokemon = new PokemonModel(pokemon);
    await this.ownPokemon.create(userId, this.pokemon.id)

    await this.say(`Request approved 👍 monster ball hit ${this.pokemon.name} & get !!!`);
  }

  async giveFood(pokemonId) {
    const pokemon = await this.pokeApi.getPokemon(pokemonId);
    this.pokemon = new PokemonModel(pokemon);
    
    await this.say(`Request approved 👍 ${this.pokemon.name} eat food !!!`);
  }
}
export default PokemonController;