const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client({ //adicionando status no bot
 presence: {
  status: 'online',
  activity: {
   name: 'Toy Story',
   type: 'WATCHING',
  },
 },
});

const prefix = "!"

client.once('ready', () => { //quando o bot ficar online no discord

  console.log('bot logado em '+client.channels.cache.size+" "+'canais de '+client.guilds.cache.size+' servers') 

   });


client.on("message", function(message) {    
  if (message.author.bot) return;

  
    const errorEmbed = new Discord.MessageEmbed() //mensagem de erro personalizada
  .setColor('#800000')
  .setTitle('Erro!')
  .setTimestamp()


  function getRandomInt(min, max) { //função de sorteio 

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;

}   


   //transformando a menssagem em um array (cada palavra em letra minúscula fica em um index do vetor)
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();


   if (command === "sort"){ //sorteia qualquer quantidade de números, palavras ou pessoas... 

    if(args.length<=1){ //se o usuário digitar só um item (ou nenhum) e não tiver como sortear 
      errorEmbed.addField('O Bot não pôde reconhecer a sua mensagem', 'Digite 2 ou mais itens', true)
      message.channel.send(errorEmbed);
      }else{
    const random = getRandomInt(0,args.length)
  	message.reply("o item sorteado é "+args[random])

     }

  }



  else if (command === "prob"){ //o bot sorteia uma probabilidade de qualquer sentença que o usuário digitar

      if(args.length<=1){
        errorEmbed.addField('O Bot não pôde reconhecer a sua mensagem','Digite uma palavra ou uma sentença ',true)
  message.channel.send(errorEmbed);
      }else{

      probabilityArray = [0,1,10,24,27,30,45,47,50,55,60,66,69,70,75,
                    80,81,85,90,91,95,99,100,200,0,200,100,-100,-200,-1]

    const probability = getRandomInt(0,probabilityArray.length)
    message.reply(`chance de `+probabilityArray[probability]+`%`)

  }

  }

  else if(command === "comandos"){ //Mostra os comandos do Bot e como usá-los

    const commandEmbed = new Discord.MessageEmbed()

    .setColor('#4B0082')
    .setTitle('Menu de comandos do Bot Random')
    .setAuthor('João Manoel', null , 'https://github.com/JoaoManoelFontes')
    .setDescription('todos os comandos do bot aqui')
    .addFields(
      { name: '!sort', value: 'Sorteia qualquer quantidade de números, palavas, pessoas, etc. Teste: Digite !sort 1 2 3 no chat e um desses items vão ser sorteados' },
      { name: '!prob', value: 'Sorteia uma probabilidade de acontecer qualquer sentença. Teste: Digite !prob do Discord ser muito bom e o bot te mostrará a probabilidade ' },
      )
    .setTimestamp()
 
 message.channel.send(commandEmbed);


  }
  
    
});

client.login(config.BOT_TOKEN);
