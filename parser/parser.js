// import _ from 'lodash'
// import CSSselect from "css-select";
const path   = require('path')
const fs     = require('fs')
const fetch  = require('node-fetch')
const colors = require('colors')
const { dirname } = require('path')
// import htmlparser2 from "htmlparser2";


//      const response = await fetch('https://www.farfetch.com/ru/shopping/women/amir-slama--item-15761719.aspx?storeid=9682&rtype=inspire_portal_pdp_generic_a&rpos=4&rid=a0b85056-a837-4046-9e44-03967299b7dc')
//      const str = await response.text()


/////////////////////////////  парсинг только через строку   ////////////////////////////


async function fn(url) {
        
        let str = ''
        // const str = fs.readFileSync(path.resolve(__dirname,  'goods/f1.html'), 'utf8')
        async function fun() {
             try {   
                const response = await fetch(url)
                str = await response.text()
                console.log('valid input'.bgGreen)
             } catch(er) {
                     return 'invalid input'

             }
        } 
        if(await fun() == 'invalid input') return 'invalid input of link field'




        const data = {}
        console.log('second'.red)
        // откуда
        // const subStrFrom        = 'shippingFromMessage\\":\\'
        // const startIndexFrom = str.indexOf(subStrFrom)+subStrFrom.length
        // const endIndexFrom   = str.indexOf('\\', startIndexFrom)
        // const from = str.slice(startIndexFrom, endIndexFrom)
        // // console.log('откуда = '.red, from.bgBlue)
        // data.from = from

       const subStrFrom        = 'Доставка из:'
        const startIndexFrom = str.indexOf(subStrFrom)+subStrFrom.length
        const endIndexFrom   = str.indexOf('\\', startIndexFrom)
        const from = str.slice(startIndexFrom, endIndexFrom)
        // console.log('откуда = '.red, from.bgBlue)
        data.from = from


        // стоимость
        const subStrMoney = '\\"formattedFinalPriceInternal\\":\\"'
        const startIndexMoney = str.indexOf(subStrMoney) + subStrMoney.length
        const endIndexMoney   = str.indexOf('\\', startIndexMoney)
        const money = str.slice(startIndexMoney, endIndexMoney)
        // console.log('стоимость = '.red, money.bgBlue)
        data.money = money

        // артикул бренда
        const subStrArtikul        = '\\"designerStyleId\\":\\"'
        const startIndexArtikul = str.indexOf(subStrArtikul)+subStrArtikul.length
        const endIndexArtikul   = str.indexOf('\\', startIndexArtikul)
        const articul = str.slice(startIndexArtikul, endIndexArtikul)
        // console.log('aртикул = '.red, articul.bgBlue)
        data.articul = articul

        //картинка
        const subStrImg        = '<img src="'
        const startIndexImg = str.indexOf(subStrImg)+subStrImg.length
        const endIndexImg   = str.indexOf('"', startIndexImg)
        const img = str.slice(startIndexImg, endIndexImg)
        // console.log('картинка = '.red, img.bgBlue)
        data.img = img

        // фирма + название  
        const subStrName        = '<meta property="og:title" content="'
        const startIndexName = str.indexOf(subStrName)+subStrName.length
        const endIndexName   = str.indexOf('"', startIndexName)
        const name = str.slice(startIndexName, endIndexName)
        // console.log('название с фирмой = '.red, name.bgBlue)
        data.name = name
        
        // storeid=
        const subStr_storeid        = 'storeid='
        const startIndex_storeid = str.indexOf(subStr_storeid)+subStr_storeid.length
        const endIndex_storeid   = str.indexOf('"', startIndex_storeid)
        const storeid = str.slice(startIndex_storeid, endIndex_storeid)
        // console.log('название с фирмой = '.red, name.bgBlue)
        data.storeid = storeid
        



        const data_out = JSON.stringify(data)
        // const data_out = data
        return data_out
}
module.exports.fn = fn;
// fn('https://www.farfetCustumerh.com/ru/shopping/women/stella-mccartney--item-16731713.aspx?storeid=9838')

///////////////////////////////////////////////////////////////////////////////////////////////////////////


// не работают 
// https://www.farfetch.com/ru/shopping/women/amir-slama--item-15761719.aspx?storeid=9682&rtype=inspire_portal_pdp_generic_a&rpos=4&rid=a0b85056-a837-4046-9e44-03967299b7dc



// // название
// const subStrName = 'data-tstid="cardInfo-description"'
// const currentIndexName = str.indexOf(subStrName)
// const startIndexName = str.indexOf('>', currentIndexName)+1
// const endIndexName   = str.indexOf('<', startIndexName)
// console.log('название = '.red, str.slice(startIndexName, endIndexName).bgBlue)


// //////////////////////////////////////////////////////////////////////////////
// const dom = htmlparser2.parseDocument(str)

// // const images =  CSSselect.selectAll('img', dom).map(e => e.attribs.src)
// // console.log(images)


// //все скрипты 
// const scripts =  CSSselect.selectAll('script', dom)

// //нашёл нужный скрипт "в ручную"
// const dataOfScript = scripts[scripts.length - 4]
//                         .children[0]
//                         .data
                        
// //подготовка к парсингу
// const raw1 = dataOfScript.slice(28, dataOfScript.length - 1)

// let raw2 = ''
// for(let i = 0; raw1.length > i; i++){
//     if (raw1[i] != '\\') raw2 += raw1[i]
// }

// const raw3 = raw2.slice(0, 67510)

// //сам парсинг
// const json = JSON.parse(raw3+'"}}}}')


// // достать данные по ключу
// let from = ''
// const getData = (obj) => {  
//     if (obj instanceof Array) obj.forEach(element => getData(element));  
//     for (const subStr in obj) {
//         if (obj[subStr] instanceof Object) getData(obj[subStr])
//         if (subStr === "shippingFromMessage") {
//             // console.log(colors.bgGreen(obj[subStr]))
//             from = obj[subStr]
//         }
//     }
// }
// getData(json)
// console.log(from.blue)
// /////////////////////////////////////////////////////////////////////











// https://www.farfetch.com/ru/shopping/women/mr-mrs-italy--item-16404295.aspx?storeid=10187
// {/* <div class="_1bcfc9" tabindex="0"> <div class="_1b910b _ab46e0" data-tstid="estimatedDelivery"><h4 class="_b4693b _61a1ae">Примерная дата доставки:</h4><p class="css-4y8w0i-Body e1s5vycj0"><bdi dir="ltr">Стандарт: <span dir="ltr">6 янв. - 17 янв.</span></bdi></p><p class="css-4y8w0i-Body e1s5vycj0"><bdi dir="ltr">Экспресс-доставка: <span dir="ltr">5 янв. - 12 янв.</span></bdi></p></div><p data-tstid="shippingFromInformation" class="_854783 _b4693b"><span data-flag="flag-it" class="_c16c72 _760aee" aria-hidden="true" data-tstid="shippingFromInformationFlag" style="background-position: -1982px center; background-image: url(&quot;https://cdn-static.farfetch-contents.com/assets/portal-core-appportal/images/flags.3a541ba7fd2f2a9.jpg&quot;);"></span><span data-tstid="shippingFromInformationMessage">Доставка из: Италия</span></p> </div> */}
// .filter(e => e.attribs.data == 'shippingFromInformationMessage')
// {/* <span data-tstid="shippingFromInformationMessage">Доставка из: Италия</span> */}
// shippingFromMessage
// {/* <script>window.__HYDRATION_STATE__="{\"apolloInitialState\":{}, */}