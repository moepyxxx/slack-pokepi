import { HOUEN_MAX_ZUKAN_NO, HOUEN_MIN_ZUKAN_NO } from "../constant";

class PokemonModel {


  /**
   * ずかんID
   */
  id;
  
  /**
   * ポケモンの名前
   */
  name;

  /**
   * 画像URL
   */
  imageUrl;

  /**
   * 
   * @param {*} pokemon 
   * API処理結果のpokemonオブジェクト
   */
  constructor(pokemon) {

    if ( pokemon.id < HOUEN_MIN_ZUKAN_NO || pokemon.id > HOUEN_MAX_ZUKAN_NO ) {
      throw new Error('ホウエン地方のポケモン限定です！')
    }

    this.id = pokemon.id
    this.name = pokemon.name
    this.imageUrl = pokemon.sprites.front_default

  }
}
export default PokemonModel;