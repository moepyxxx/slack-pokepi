import { Client } from "@notionhq/client"
const env = process.env

class OwnPokemon {

  notion = new Client({ auth: env.NOTION_INTEGRATION_SECRET })
  databaseId = env.NOTION_DATABASE_ID

  createUniqueKey() {
    const strong = 1000;
    return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
  }

  async create(userName, pokemonId) {
    try {
      await this.notion.pages.create({
        parent: {
          database_id: this.databaseId,
        },
        properties: {
          id: {
            title: [
              {
                text: {
                  content: this.createUniqueKey(),
                },
              },
            ],
          },
          user_name: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: userName,
                }
              },
            ],
          },
          pokemon_id: {
            number: pokemonId
          },
        },
      });

    } catch(e) {
      throw new Error('OwnPokemon create Error', e);
    }
  }

  async delete() {

  }

  async update() {

  }

  async fetch() {

  }
}
export default OwnPokemon