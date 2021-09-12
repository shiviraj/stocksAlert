const {openBrowser, goto, click, write, $, listItem, clear, toRightOf, screenshot, closeBrowser} = require("taiko")
const {TradeableStock} = require("./src/model/tradeableStock")
const Notifier = require("./src/service/Notifier");

const addSMMA = async (days) => {
  await click('indicators');
  await click('smoothed moving average');
  await click('input');
  await click('7');
  await clear();
  await write(days);
  await click('style');
  await click($("div[data-role='button']"), toRightOf('Plot'));
  await click($('input[value="4"]', toRightOf('Thickness')));
  await click('input');
  await click('OK');
};

const oneSec = () => {
  return new Promise((resolve => {
    const time = new Date().getTime() + 10000
    while (new Date().getTime() > time) ;
    resolve()
  }))
};

const takeScreenshot = async (symbol) => {
  await click($('input'));
  await clear()
  await write(symbol);
  await click(listItem(symbol));
  await oneSec()
  await oneSec()
  await screenshot({path: `images/${symbol}.png`});
};

const main = async () => {
  try {
    await openBrowser();
    console.log("Browser Open")
    await goto(
      'https://trade.angelbroking.com/portfolio/chart?cocode=25902&exch=NSE&symbol=CHALET&ntoken=8546&label=CHALET&lotsize=1&period=&views=&display=&defaultPeriod='
    );
    console.log("Visited Chart website")
    await click('6M');
    await addSMMA(5);
    await addSMMA(22);
    await addSMMA(60);
    await addSMMA(200);

    console.log("set SMMA")
    const stocks = await TradeableStock.find({isAlertSent: false})
    for (const stock of stocks) {
      console.log("screenshot taken", stock.symbol)
      await takeScreenshot(stock.symbol)
      await Notifier.notify(stock)
      await TradeableStock.findOneAndUpdate(stock, {isAlertSent: true})
    }
  } catch (error) {
    await screenshot({path: "images/error.png"})
    console.error(error);
  } finally {
    await closeBrowser();
    process.exit(0)
  }
}

module.exports = main
