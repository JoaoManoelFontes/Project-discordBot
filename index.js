const {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
require("dotenv").config();
const getRandomInt = require("./utils/sort.js"); //importando a função de sorteio do arquivo sort.js

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const prefix = "!";

client.once("ready", () => {
  //quando o bot ficar online no discord
  client.user.setPresence({
    activities: [{ name: `Wandinha`, type: ActivityType.Watching }],
    status: "dnd",
  });

  console.log(
    "bot logado em " +
      client.channels.cache.size +
      " " +
      "canais de " +
      client.guilds.cache.size +
      " servers"
  );
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const errorEmbed = new EmbedBuilder() //mensagem de erro personalizada
    .setColor("#800000")
    .setTitle("Erro!")
    .setTimestamp();

  //transformando a menssagem em um array (cada palavra em letra minúscula fica em um index do vetor)
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  if (command === "sort") {
    //sorteia qualquer quantidade de números, palavras ou pessoas...

    if (args.length <= 1) {
      //se o usuário digitar só um item (ou nenhum) e não tiver como sortear
      errorEmbed.addFields({
        name: "O Bot não pôde reconhecer a sua mensagem",
        value: "Digite 2 ou mais itens",
        inline: true,
      });
      message.channel.send({ embeds: [errorEmbed] });
    } else {
      const random = getRandomInt(0, args.length);
      message.reply("o item sorteado é " + args[random]);
    }
  } else if (command === "prob") {
    //   o bot sorteia a probabilidade de acontecer uma sentença que o usuário digitar

    if (args.length <= 1) {
      errorEmbed.addFields(
        "O Bot não pôde reconhecer a sua mensagem",
        "Digite uma palavra ou uma sentença ",
        true
      );
      message.channel.send({ embeds: [errorEmbed] });
    } else {
      const probability = getRandomInt(0, 100);
      message.reply(`chance de ` + probability + `%`);
    }
  } else if (command === "comandos") {
    //Mostra os comandos do Bot e como usá-los

    const commandEmbed = new EmbedBuilder()

      .setColor("#faa81a")
      .setTitle("Menu de comandos do Bot Random")
      .setAuthor({
        name: "João Manoel",
        iconURL: null,
        url: "https://github.com/JoaoManoelFontes",
      })
      .setDescription("todos os comandos do bot aqui")
      .addFields(
        {
          name: "!sort",
          value:
            "Sorteia qualquer quantidade de números, palavas, pessoas, etc. Teste: Digite !sort 1 2 3 no chat e um desses items vão ser sorteados",
          inline: false,
        },
        {
          name: "!prob",
          value:
            "Sorteia uma probabilidade de acontecer qualquer sentença. Teste: Digite !prob do Discord ser muito bom e o bot te mostrará a probabilidade ",
          inline: false,
        }
      )
      .setTimestamp();

    message.channel.send({ embeds: [commandEmbed] });
  }
});

client.login(process.env.BOT_TOKEN);
