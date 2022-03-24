require("dotenv").config({path: '../.env'});
const Discord = require('discord.js');
const Destiny = require('./Destiny.js');

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

let response = {}
client.on('messageCreate', async message => {
    if(message.content === '/xur'){
        const data = await Destiny.getVendors()

        for (vendor in data){
            let vendorDetails = await Destiny.getVendorInformation(vendor) // 2917531897 is ada1
            response[vendorDetails.name] = {}
            for (item in data[vendor].saleItems){
                let current = data[vendor].saleItems[item]
                let itemDetails = await Destiny.getItemInformation(current.itemHash)
                let itemDisplayProps = itemDetails.displayProperties
                let itemName = itemDisplayProps.name
                let itemIcon = `http://www.bungie.net${itemDisplayProps.icon}`
                let itemDescription = itemDetails.itemTypeDisplayName

                if(itemDisplayProps.name){
                    response[vendorDetails.name][itemName] = {
                        name: itemName, 
                        icon: `${itemIcon}`, 
                        description: itemDescription
                    }
                }
            }
        }

        for(let i = 0; i < Object.keys(response).length; i++){
            for(let j = 0; j < Object.keys(response[Object.keys(response)[i]]).length; j++){
                let vendorName = Object.keys(response)[i] 
                let itemName = response[Object.keys(response)[i]][Object.keys(response[Object.keys(response)[i]])[j]].name
                let itemDescription = response[Object.keys(response)[i]][Object.keys(response[Object.keys(response)[i]])[j]].description
                let itemImage = response[Object.keys(response)[i]][Object.keys(response[Object.keys(response)[i]])[j]].icon

                const itemPost = new Discord.MessageEmbed()
                itemPost.setColor('0099ff')
                itemPost.setTitle(itemName)
                itemPost.setTitle(vendorName)
                itemPost.setImage(itemImage)
                itemPost.setTimestamp()
                itemPost.setFooter({ text: 'Some footer text here' })
                itemPost.addFields(
                    { name: itemName, value: itemDescription },
                    { name: '\u200B', value: '\u200B' }
                )

                message.guild.channels.cache.get('956375511502819388').send({ embeds: [itemPost] })
            }
        }
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)