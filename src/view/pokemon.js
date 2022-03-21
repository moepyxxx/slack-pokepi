class PokemonView {

  appear(name, imageUrl, id) {
    return {
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
              "action_id": "monster_ball",
              "value": id.toString()
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "GiveFood"
              },
              "style": "primary",
              "action_id": "give_food",
              "value": id.toString()
            }
          ]
        }
      ]
    };
  }
}
export default PokemonView;