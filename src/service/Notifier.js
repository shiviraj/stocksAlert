const axios = require("axios")
const fs = require("fs");
const FormData = require('form-data');

const createMessage = stock => {
  return `<b>Symbol: ${stock.symbol}</b>
Type: <b>${stock.type}</b>
Cost: <b>${stock.cost}</b>
StopLoss: <b>${stock.stopLoss}</b>
Risk: <b>${stock.risk}</b>
Date: <b>${stock.date}</b>`
};

const Notifier = {
  bot: process.env.BOT,
  chatId: process.env.CHAT_ID,

  sendImage: async function (symbol) {
    const data = new FormData();
    data.append('photo', fs.createReadStream(`./images/${symbol}.png`));

    const config = {
      method: 'post',
      url: `https://api.telegram.org/bot${this.bot}/sendPhoto?chat_id=${this.chatId}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...data.getHeaders()
      },
      data: data
    };

    return new Promise((resolve, reject) => {
      axios(config).then(res => resolve(res.data)).catch(reject);
    })
  },

  async notify(stock) {
    const data = {
      "chat_id": this.chatId,
      parse_mode: "HTML",
      "text": createMessage(stock)
    }
    await axios.post(`https://api.telegram.org/bot${(this.bot)}/sendMessage`, data)
    await this.sendImage(stock.symbol)
  }
}

module.exports = Notifier
