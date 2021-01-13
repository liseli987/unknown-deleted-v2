const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['721359314731663401', 'EXTRA ROL KOYABİLİRSİN', 'EĞER KOYMAK İSTEMİYORSAN TIRNAKLARI SİL'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
let tag = "𐌞"
const kayıtlı = message.guild.roles.cache.find(r => r.id === '709421783500980305')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '716722516701478923')

if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('Kayıt edeceğim kişiyi etiketler misin?. <a:party_blob:790180851119292417>')
let stg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('İsim belirtir misin lütfen?. <a:party_blob:790180851119292417> ')
if(!yas) return message.reply('Son olarak yaş belirtir misin lütfen?. <a:party_blob:790180851119292417> ')

stg.setNickname(`${tag} ${isim} | ${yas}`)  
stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız)

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`kadinUye.${message.author.id}`, 1)
let kadın = db.get(`kadinUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
  
const embed = new Discord.MessageEmbed()
.setTitle(`<a:tik:788165978357235762> Kayıt İşlemi Tamamlandı`)
    .addField(`<a:vkirmizitac:795464473976242188> Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`<a:dj8:786608496673030176> Kayıt Edilen:`, `<@${stg.user.id}> Kayıt Oldu`)
    .addField(`<a:hareketlitik2:794706984548040724> Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
    .addField(`<a:olumusztik2:794706964956315668> Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`<a:kirmizikalp:795465572875894814> Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`<a:dnyor2:795468242998394910> Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
.setFooter(`𐌞anity • #2021`)
.setColor('#ff0000')
client.channels.cache.get('709201292760842241').send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kadın','k','woman','girl', 'kız'],
    permLevel: 0
};

exports.help = {
    name: 'kadın',
};
