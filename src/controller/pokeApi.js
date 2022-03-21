import axios from 'axios'

class PokeApi {

  /**
   * ベースとなるURL
   */
  baseUrl = 'https://pokeapi.co/api/v2/';

  /**
   * ポケモンの基本情報を取得するためのパス
   */
  pokemonPath = 'pokemon/'

  async getPokemon(pokemonId) {
    return await (await axios.get(this.baseUrl + this.pokemonPath + pokemonId)).data;
  }

}
export default PokeApi;