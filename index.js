const fs = require('fs');
const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    session: sessionData
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', async msg => {
    if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        // do something with the media data here

        //const medial = new MessageMedia('sticker', media);
        //client.sendMessage(msg.from, { media: media, sendMediaAsSticker: true });

        //const sticker = MessageMedia.fromFilePath('/path/to/image.png');
        client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
    }
});

/*

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀█▄ █▀█▀█ ▀▀▀█▄▄▀▀▀ ▄ ▄ █▀█▀▄█ ▄▄▄▄▄ █
█ █   █ █▀█▄▄▀ █▀█ ▀▀  ▀▄▀ ██▄ ▄▀▄▄█ ▀█ █   █ █
█ █▄▄▄█ █▀█▄▄ ▀███▄██ ▄▄▄ ▄█ ▄▄▄ ▄▀▄▄▄█ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄▀ ▀ ▀▄▀▄█ ▀ █▄█ █ ▀▄█ ▀ ▀ █▄█▄▄▄▄▄▄▄█
█ ▄   █▄▄ █ ▄▀▀▀▀▄▀▄▄    ▄ ██▀▀ ▀▀▄█▀▀▄█ ▀ █ ██
█ ▀█▄▄▄▄▄  ▄  ▀█ ▄█▀▀▄▄██   ██▀▄▄ █▀█▀   █▄  ██
█▀ ▀▀▀ ▄▄ ▄███▀▀█▄▀▄▀▄▄▀▀▄▀▄▀▀▄ ▄█▀▄ ▀▀▄██▄█▀▀█
█▀▄ ▀ ▀▄█▄▄▄ ▀█▄▀█▀ █▄ █  █▀▄▀ █▄█▀▄▀█ ▄██▀ ▀██
█ █ ▄▄█▄▄█     ▀██▄ ▄▀█▄▀█▀▄▀█  ▄██▄▀ ▀███ ▄███
██▀█▄▄█▄██▄ ▀▄ █▀ █ ▀███▀▄▄ ███▀▄█▀▄▀▄█▄▀█▄ ▄██
█ ███ ▄▄▄  ▀▀▀▄█▀▄▄▄▄ ▄▄▄ ▀███ ▀ ▀▄▄█ ▄▄▄ ▀▀▀██
██ ▄▄ █▄█ ▀██▀▀▀▀ █▀▀ █▄█ ▀█ █▀▄▀ ▄█▄ █▄█   ▄▀█
█▄▀▄█▄ ▄  ▀ ▄  █ ▄▀▄  ▄▄▄ ▀▄█▀▀  █▄██▄ ▄▄▄▀██▄█
█ █ █▄█▄█ ▄ ▄ █▀ ▄██▀▀▄▄   ▄  ▀█▄▀▀ ▄▄▄█▄ ▀  ██
█▀ ▀█▄ ▄▄██  ▀▄█▄▄█▄▀▀██ █ █▀█ ▀██▀██▀▀███▄▄▀██
█▄███▀▄▄  ▀▀▀ ▀█ ▀█ █▄ █▄▀ ▄ ▀ ▄█▀█▄ ▄▄▀▀▄  ▄▀█
█▄▄ █▄▄▄▄ ██▀▄▀▀▄▄▀▄ ▀█▀▀▄ ██▀▀▀ █▄▄█  ▀▄▄ ▀▀ █
██▀▀▀ █▄▄ ██▀█▄█▄  █▀ ▀█▀▀▄▄▄▀█ ▀  ▄ █ ▀█▄ ▀███
█▄██▄▄█▄▄▀  ▄▀▀▀▄▄ ▄▄ ▄▄▄  ████  ▀█▄▀ ▄▄▄  ▀█▄█
█ ▄▄▄▄▄ █▄▀ █▀ ▄ ▄▄▄▀ █▄█ ▄▄▄█▄▀▄█ ██ █▄█  ▀▄▀█
█ █   █ █ ▀ █ ▀▀▄█  █▄▄▄  ▀█▀▀  ▄▀█▄   ▄ ▄▄▀▀▄█
█ █▄▄▄█ █  ▀ ▄█▀███ █  ▀█ █▄█▀▀▀██▀█ ▄▀▄█▀  █▄█
█▄▄▄▄▄▄▄█▄█▄▄█▄██▄▄▄██▄▄▄▄▄█▄█▄▄▄████▄█▄██▄▄▄██

*/