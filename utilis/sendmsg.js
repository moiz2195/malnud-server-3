const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');

// let sessionData;
// let SESSION_FILE_PATH='../session.js'
// if(fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

const client =new Client({
    puppeteer: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
        
    },
    authStrategy: new LocalAuth()
})
// const client=new Client({
//     authStrategy:new LocalAuth()
// })

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    // sessionData = session;
    // fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    //     if (err) {
    //         console.error(err);
    //     }
    // });
});
 
 

client.initialize();
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})
client.on("ready",()=>{
    const chatid= '923114224475' +"@c.us";
    const message=`Hello,\nThis is a reminder that your monthly fees of malnad pg is pending and please pay it as soon as possible.\nRegards\nMadhu Prakash T P\nMalnad Paying Guest`;
    client.sendMessage(chatid,message)
})
const sendmsg=(phone)=>{
    const chatid=phone+"@c.us";
    const message='Hello,\nThis is a reminder that your monthly fees of malnad pg is pending and please pay it as soon as possible.\nRegards\nMadhu Prakash T P\nMalnad Paying Guest';
    client.sendMessage(chatid,message)
}

module.exports=sendmsg