const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0FLVTl0YksrMFA2VThRZE45SGhacjV1VkVRWThweFdaTytVczlBTVRHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidnJUWHBockYrQmZtcDFrclRkUWpKVVY2UjVqN0lQUGhDQmNQRTdiWU9FYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrSWZudG9NdVFYN2psMVJtTDA3bXhzemRacjN0V0x6eEZoWTczZUI0dm04PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIY2F0bTA3YUdyVWt2Qk1Dalk2dXIrSVM4STFtV3Y5emlwMkJENE1iZUVnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNJa1FHK2hLK0tMcDJFMDdKckFaTmJ3M09RQUsvdThGS1p1TFo4U25mM289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpMMDJ0MTZWZGdVUGFHNTFpV3NqaWF3RkFMTUxiblF0cGNheW1YdjEyaXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEFaOXpyYW9NbWpaNVl0YzVIUU1VZDRmMGRTNkNrOXlheEM0ekY1S2RtTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTJQckFZbDlRU2dHQUtidndWcjAxZkszbk9Pc1ZYb0tjSjB2SU5sVjBYTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImwwWlU3UTZiN3lqTUlBd2llcjhiS0ZCaDQ2bENFS0N5dUFiUVBhcEY3Q1ZaU1FHenhxWTJqRTJDb0JETlFOSWVCK2NCbERiV3ExcEZOc05pZU51UmdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcyLCJhZHZTZWNyZXRLZXkiOiJQRStMa1RKUDZVVzZ4eDlkUGRsNitrTFpkanFtTi9id25pbGZvR09ta0R3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNS2owd29vLVF4NnFxY05teFBKeVZBIiwicGhvbmVJZCI6IjBjMWI3MTk0LTg1MjktNGQ5OC04MzliLTRkYzg5ZjZlYTFhOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLbkQvYkJ1REN4d0hDRjFDT1V4VVZ4cXUxeWc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmVoUlMzUU8xc0c3SW9id01MeWY3ZmFUTHZnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdYM1lSSktBIiwibWUiOnsiaWQiOiIyMjg5OTk3NjI1MzoyOUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS1dlM0tBSEVKZTU1cnNHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidWZJTE9iK2I5MVFFQ3d0L1lFN0ZTZ1NrMzBvN2Y3VWYyTFNac3pFb3hWND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNWl3OEdCbHpDVThEdGVpUkYrL2JVMU5FVTBBclBrekl1cjRoVFFqaGswN3dSeTZOQkhrdFpYSkcrem40UmU1RjhDTVFqY01MbXFFbFRQWnJ5V0o0Qnc9PSIsImRldmljZVNpZ25hdHVyZSI6ImJhdm1kMWdJdWdTK1hoNWsrTmM0RzJ6bTU5bDA5TngwbUM4NXhmRlpQRGRkTnhpZGNPWTVGY0VNdGJBV1kwMnFrTnZwQUxwVGVyenMxMVhmYVYyOGhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI4OTk5NzYyNTM6MjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYm55Q3ptL20vZFVCQXNMZjJCT3hVb0VwTjlLTzMrMUg5aTBtYk14S01WZSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNjAyMzIwNH0=',
    PREFIXE: process.env.PREFIX || "🔞",
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 22899976253",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://chat.whatsapp.com/C7WzNyi84h7BGIU1lT8SPJ',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'no', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
