const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlFQ1lnaDBVK085NzVyeEtwN2krR0pKYmN5RXdYZEtDZWRhYSt1TGRIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGNzeEQ5RjdzY2VzZmtRd2EyQkRqMWdIWUlQVlpFQVZvL1U1ODJSeXJIRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQWpJVjN5dmZXaVdVdVFlb29Tc0tzYUJmMmRCdDlERFJYSnRRanA5MEY0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwMHN4OHR1cis2U3ZvVStJL0RiQTBrRm5IdEpXR1BMTFBjNVQrS3JVWGhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdBU0VnZWh2Z29EVkRlcE85QU00YzdEZjdUTG5jQlJ5Y3V3dVovN1ZJbVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inl0aU1jeVNBUXRCdnBaaC9GRzMxaDRXMkZZRHRjQzFZSkZ1d1M4dFk0eG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0NBYUpCNWpIYTRCME5sak5VQ1ZMQ1pmeDFHcUFqdnErU29id01ianhXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFBhN2JwamMxV2gzOTJ3eVBqVG5Id3BRSlBsZXRmemUvcWNrMDJwQjRDST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBJU29qSlFjK3hxeWtDTGllRzJHUWFnZDkyam10cGxWUXk1MDhiZWIrRlF1UTJMZmgxRkFiQ2VjNXdQWEhnR01xMXp5RWZ6NW1veXRvd20ycUJQREJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODgsImFkdlNlY3JldEtleSI6IjJKVHdYaU5xdnpyZGRrZFM3bkV1eHk5cEF5NG9Rd1U2KzFIcTRnbC9VK0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzA1MTAwNjUxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkZFN0VDNjNFRUU4OEM1RTVCRUZDNUU4Nzc3MDI0NEM0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk5MDA1Njd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcwNTEwMDY1MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzNjU5NUE3MjI3QTZERDZBNjcxOTMxQjg2OURDRDBBRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5OTAwNTcwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MDUxMDA2NTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzI2ODZCMkFGMkM3ODI4NjE2MjkwOTU2MEFCMTM5NkEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTkwMDU3OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjI1NDcwNTEwMDY1MTo2QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjc4NjEwODAzOTU3NzgxOjZAbGlkIiwibmFtZSI6ImthbnlhcmFiZXRoIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLV2U2dUFHRUlPNnRjSUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI0a3RUN3cwZ3AyY0lqS2pMWmE1WlJwNWxWQXhmN2loYUpZTExGbGtWMjNBPSIsImFjY291bnRTaWduYXR1cmUiOiJteUpFK3dVNlBUNG1nOHducStjbEZSY1p2eElDNmZnZ1R4cHlRR2RpUWxHTjJZMGdWMU9EMUdVU2tSUTdjcUQ1ZVFlSnRna3ltVGtHbWlVNEpBbnZEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVEt4S0tGdzVNUCtKOSt6dWdueEEyYlY0Y09rN3F5RUozdVYxQ1R5eDM3dkhhQUdFK241djBDaGFOTkU4TU5WZXc5TkoraCtFMWJ5YzNzV2dUTWpNQVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MDUxMDA2NTE6NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlSkxVKzhOSUtkbkNJeW95Mld1V1VhZVpWUU1YKzRvV2lXQ3l4WlpGZHR3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDk5MDA1NjEsImxhc3RQcm9wSGFzaCI6IjFLNGhINCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRTI4In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Charleske",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254705100651",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
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
