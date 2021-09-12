const axios = require("axios")

const Notifier = {
  bot: "1961595319:AAHlR7DxcCvCum0HWPF0EykGrL_LnL6QJZY",

  notify(stock) {
    const data = {
      
    }
    return axios.post(`https://api.telegram.org/bot${(this.bot)}/sendMessage`, data)
  }
}

module.exports = Notifier
