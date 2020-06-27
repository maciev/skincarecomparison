//This app scrapes information from RoseRoseshop

const puppet = require('puppeteer');





async function scrape(_url) {

    const browser = await puppet.launch();

    const page = await browser.newPage();

    await page.goto(_url);

    //get price
    const [price] = await page.$x('//*[@id="product-price"]/li/span[2]');
    const priceText = await price.getProperty('textContent');
    const priceJson = await priceText.jsonValue();
    const priceFinal = priceJson.replace('\\n', '').trim();

    //get title
    const [title] = await page.$x('//*[@id="content"]/div/div[1]/div[2]/h1');
    const titleText = await title.getProperty('textContent');
    const titleFinal = await titleText.jsonValue();

    console.log({priceFinal, titleFinal, _url});

    let fs = require('fs'),
        jsonData= JSON.stringify({titleFinal, priceFinal, _url});

    //writes to database.JSON file, and if error
    fs.writeFileSync('database.json', jsonData,function(err)
    {
        if (err) {
            console.log(err);
        }
    });

    browser.close();
}

scrape('https://www.roseroseshop.com/some-by-mi-aha-bha-pha-30-days-miracle-serum-50ml.html')

