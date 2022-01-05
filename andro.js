const puppeteer = require('puppeteer-extra');
const chalk = require('chalk');
const moment = require('moment');
const delay = require('delay');
const readline = require("readline-sync");
const fs = require('fs-extra');
var random = require('random-name')
var randomize = require('randomatic');
var Fakerator = require("fakerator");
const randomstring = require("randomstring");
const randomUseragent = require('random-useragent');



(async () => {

    var uagent = randomUseragent.getRandom(function (ua) {
        return parseFloat(ua.browserVersion) >= 21;
    });

    //input token
        var linklogin = readline.question(chalk.yellow('[?] List account token (ex: link.txt): '))

    console.log('\n');
    const read = fs.readFileSync(linklogin, 'UTF-8');
    const list = read.split(/\r?\n/);
    for (var i = 0; i < list.length; i++) {
        var token = list[i];

    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Account => ${i}`))       
    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Token => ${token}`))

    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport: null,
        ignoreHTTPSErrors: true
    });

    const optionlink = {
        waitUntil : 'networkidle2',
        setTimeout : 900000,
    };
    const optionbtn = {
        visible:true,
        timeout:60000
    };


    const page = await browser.newPage();

    
    //login token
    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Wait for login`))
    await page.goto(`${token}`,{ waitUntil: 'networkidle2', timeout: 60000 });
    console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Login success`))

    //SET ADDRESS
    await page.goto('https://ilogisticsaddress.aliexpress.com/addressList.htm?spm=a2g0o.new_account_index',optionlink)

    try{
        await page.click("#address-main > div > div > div:nth-child(2) > div > div:nth-child(5) > button:nth-child(2)")
        await delay(1000)
        await page.click("body > div.next-overlay-wrapper.opened > div.next-dialog.next-closeable.next-overlay-inner > div.next-dialog-footer.next-align-right > button.next-btn.next-medium.next-btn-primary.next-dialog-btn")
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Delete old address`))
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Set New Address`))
    }catch(err){
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Set New Address`))
    }

        var fakerator = Fakerator("en-CA");
        var address = fakerator.address.street()
        var address2 = fakerator.address.street()    
        const randomcity1 = randomstring.generate({length: 1,charset: '31542'}); 
        const fileranprov = fs.readFileSync(`./listprovinsi.txt`, 'utf-8');
        const splitFileranprov = fileranprov.split('\r\n');
        var ranprovinsi = splitFileranprov[Math.floor(Math.random()*splitFileranprov.length)];

    await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",optionbtn)
    await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
    await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",optionbtn)
    await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "indonesia")
    await delay(800)
    await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",optionbtn)
    await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
    await delay(500)
        await page.waitForSelector("#contactPerson",optionbtn)
        await page.type("#contactPerson",`${random.first()} ${random.last()}`)
        await delay(500)
        await page.click("#phoneCountry",{clickCount:3})
        await page.type("#phoneCountry","+62")
        await delay(500)
        await page.type("#mobileNo",`8${randomize('0', 10)}`)
        await delay(500)
        await page.type("#address",`${address} ${randomize('a', 5)} ${address2}`)
        await delay(500)
        await page.type("#zip",`${randomize('0', 5)}`)
        await delay(500)
    await page.click("div.selector-item:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > em:nth-child(1)")
    await delay(800)
    await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
    await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
    await delay(800)
    await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
    await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",ranprovinsi)
    await delay(800)
    await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li",optionbtn)
    await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li")
    await delay(500)
    await page.click("div.selector-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > em:nth-child(1)")
    await delay(1000)
    await page.waitForSelector(`.opened > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(${randomcity1})`,optionbtn)
    await page.click(`.opened > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(${randomcity1})`)
    await delay(500)
    await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",optionbtn)
    await page.click("#address-main > div > div > div > div > div.address-save > button")
    await page.waitForSelector('#address-main > div > div > div.address-list-wrap > div > div.address-detail.big-detail > div')
    const pcitys = await page.$eval('#address-main > div > div > div.address-list-wrap > div > div.address-detail.big-detail > div',(el) => el.innerText);
    console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success set address to : ${pcitys}`))


    //DELETE CART
    await page.goto('https://m.id.aliexpress.com/shopcart/list.html#/',optionlink);
    if (await page.$('#shopcart-app > div > div > div:nth-child(2) > div > div > span > div > div:nth-child(3) > div'))
    {
        await page.click("#shopcart-app > div > div > div:nth-child(2) > div > div > span > div > div:nth-child(3) > div")
        await delay(600)
        await page.waitForSelector("#shopcart-app > div > div > div > header > div > div > div > svg > use",optionbtn)
        await page.click("#shopcart-app > div > div > div > header > div > div > div > svg > use")
        await delay(600)
        await page.waitForSelector("#shopcart-app > div > div > div > header > div > div:nth-child(2) > svg > use",optionbtn)
        await page.click("#shopcart-app > div > div > div > header > div > div:nth-child(2) > svg > use")
        await delay(1000)
        await page.click("body > div.flex.justify-center.align-center._3zxBO > div > span > div > div:nth-child(3) > div:nth-child(2)")
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success delete all item in cart `))
        await delay(600)
    } 

    //ADD CART1
    await page.goto("https://m.id.aliexpress.com/item/1005003230523068.html",optionlink)

    try{
        await delay(800)
        await page.click("#smartbanner-main > div.smartbanner-ui__dialog > div > div > img")
    }catch(err){}
    
    const product1= randomstring.generate({length: 1,charset: '132'}); 
    const productname1 = await page.$eval('#root > div:nth-child(4) > div:nth-child(2) > span',(el) => el.innerText);

    await page.waitForSelector("#action-bar > div > a",optionbtn)
    await page.click("#action-bar > div > a")
    await delay(1200)
    await page.waitForSelector(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.sku-panel--property--3YeEpFD > div.sku-panel--skus--3PMc-6q > div:nth-child(${product1}) > img`,optionbtn)
    await page.click(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.sku-panel--property--3YeEpFD > div.sku-panel--skus--3PMc-6q > div:nth-child(${product1}) > img`)
    await delay(800)
    await page.waitForSelector("body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.switcher--container--1KUUL7o > svg",optionbtn)
    await page.click("body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.switcher--container--1KUUL7o > svg")
    await delay(800)
    await page.waitForSelector("body > div:nth-child(15) > div.drawer-container.drawer-bottom.bottom-drawer-container.freight--drawer--34H5oUG > div.scroll-panel-content.bottom-drawer-content > div.shipping-panel--shipping--7QGfTfH > div:nth-child(2) > div > div",optionbtn)
    await page.click("body > div:nth-child(15) > div.drawer-container.drawer-bottom.bottom-drawer-container.freight--drawer--34H5oUG > div.scroll-panel-content.bottom-drawer-content > div.shipping-panel--shipping--7QGfTfH > div:nth-child(2) > div > div")
    await delay(800)
    await page.waitForSelector("#action-bar > div > a",optionbtn)
    await page.click("#action-bar > div > a")
    console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success add product to cart : ${productname1}`))
    await delay(800)


    //ADD CART2
    await page.goto("https://m.id.aliexpress.com/item/1005003408351680.html",optionlink)
    await delay(800)

    const product2= randomstring.generate({length: 1,charset: '8'}); 
    try{
        var productname2 = await page.$eval('#root > div:nth-child(4) > div:nth-child(2) > span',(el) => el.innerText);
    }catch(e){
        var productname2 = await page.$eval('#root > div:nth-child(5) > div:nth-child(2) > span',(el) => el.innerText);
    }
    await page.waitForSelector("#action-bar > div > a",optionbtn)
    await page.click("#action-bar > div > a")
    await delay(1000)
    await page.waitForSelector(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.sku-panel--property--3YeEpFD > div.sku-panel--skus--3PMc-6q > div:nth-child(${product2}) > img`,optionbtn)
    await page.click(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.sku-panel--property--3YeEpFD > div.sku-panel--skus--3PMc-6q > div:nth-child(${product2}) > img`)
    //await delay(800)
    //await page.waitForSelector(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div:nth-child(5) > div.sku-panel--skus--3PMc-6q > span`,optionbtn)
    //await page.click(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div:nth-child(5) > div.sku-panel--skus--3PMc-6q > span`)
    //await delay(800)
    //await page.waitForSelector("body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.quantity--container--3D-6hmh > div.number-picker--container--8edZVq_ > svg:nth-child(3) > use",optionbtn)
    //await page.click("body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.quantity--container--3D-6hmh > div > svg:nth-child(3) > use")
    await delay(800)
    await page.waitForSelector("#action-bar > div > a",optionbtn)
    await page.click("#action-bar > div > a")
    console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success add product to cart : ${productname2}`))
    await delay(500)


    //CHECKOUT
    await page.goto('https://m.id.aliexpress.com/shopcart/list.html#/',optionlink);  
    await delay(800)
    try {
        await page.click("#shopcart-app > div > div > div._1Q1iM > div > div > span > div > div.flex.justify-end > div",)
      } catch (err) {
        
      }
    await delay(1000);    
    await page.click("#shopcart-app > div > div > div > header > div.flex.justify-space-between.align-center._24yND > div.flex.justify-space-between.align-center._1YPZE > div.flex.justify-end.LJDeC > svg > use",optionbtn);


    try {
      await delay(1000)  
      await page.click("#shopcart-app > div > div > div > div > div:nth-child(3) > div > div > div > div:nth-child(2)",)
    } catch (err) {
        await delay(1000)  
        await page.click("#shopcart-app > div > div > div > div > div:nth-child(4) > div > div > div > div:nth-child(2)")
      
    }

    //SET DOKU
    try{
    await delay (2500)
    await page.click("#payment > div > div.cell-content > div > span:nth-child(2) > span:nth-child(2)")
    }catch(err){
        console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] DOKU not detected `))
        //save file
        await fs.appendFile('nodoku.txt', `${token}`+'\r\n', err => {
            if (err) throw err;
        })
        await browser.close()
        
        var files = fs.readFileSync(linklogin, 'utf-8');
        var lines = files.split('\n')
        lines.splice(0,1)
        await fs.writeFileSync(linklogin, lines.join('\n'))
        continue;
    }
    await page.waitForSelector('#total-price > div > p:nth-child(2) > span:nth-child(2)')
    const price = await page.$eval('#total-price > div > p:nth-child(2) > span:nth-child(2)',(el) => el.innerText);

    
    //payment
    await delay(2000)
    await page.waitForSelector("#pay-btn",optionbtn)
    await page.click("#pay-btn")
    console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Try to pay ${price}`))

    try{
        await delay(9000);
        await page.click("#payment > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div")

        await delay(3500);
        await page.click("#payment > div > div > div:nth-child(3) > div:nth-child(2)");
    }catch(e)
    {
        console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] Payment failed | CLOSED`))
        //save file
        await fs.appendFile('fail.txt', `${token}`+'\r\n', err => {
            if (err) throw err;
        })
        await browser.close()
        
        var files = fs.readFileSync(linklogin, 'utf-8');
        var lines = files.split('\n')
        lines.splice(0,1)
        await fs.writeFileSync(linklogin, lines.join('\n'))

        var changip = readline.question(chalk.yellow('[?] CHANGE IP, Done? (y/n): '))
    
        if(changip == "y")
        {
            continue;
        }else{
            break;
    }
    }

                    
        await delay(5000);
        await page.waitForSelector("#dw_user", "endsrynt@gmail.com")
        await page.type("#dw_user", "endsrynt@gmail.com")
        await page.waitForSelector("#dw_pass", "polos123321A")
        await page.type("#dw_pass", "polos123321A")
        await page.waitForSelector("#DOKU-SUBMIT-LANG",optionbtn);
        await page.click("#DOKU-SUBMIT-LANG");
    
        await delay(5000);
        await page.waitForSelector("#pin", "4215")
        await page.type("#pin", "4215")
        await page.waitForSelector("#form-payment-w > div.default-btn.bg-paybtn.radius.btnsignin-dw > input",optionbtn);
        await page.click("#form-payment-w > div.default-btn.bg-paybtn.radius.btnsignin-dw > input");
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Payment Success`))
        await delay(5000)
    
        //save file
        await fs.appendFile('succes.txt', `${token}`+'\r\n', err => {
            if (err) throw err;
        })
        await browser.close()
        
        var files = fs.readFileSync(linklogin, 'utf-8');
        var lines = files.split('\n')
        lines.splice(0,1)
        await fs.writeFileSync(linklogin, lines.join('\n'))

        

    var changip = readline.question(chalk.yellow('[?] CHANGE IP, Done? (y/n): '))
    
    if(changip == "y")
    {
        continue;
    }else{
        break;
    }
}
})();