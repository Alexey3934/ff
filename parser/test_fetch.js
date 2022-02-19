const express = require("express")
const fetch = require('node-fetch')
const colors = require('colors')
const fs = require('fs')

const app = express()
const port = 4000

// const url = 'https://example.com'
// const url = `http://localhost:${port}/fetching`


const headers =  {
    'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
    'cookie' : 'BIcookieID=dc621d64-0adf-4978-820b-434a25f3f267; optimizelyEndUserId=dc621d64-0adf-4978-820b-434a25f3f267; ckm-ctx-sf=/ru; __Host-FF.AppCookie=CfDJ8BZV7bSK_gVKoJ5_tFR15T659JL7diCYkeDe_0bmZKioFraNwl98e6yqig-Gr_K-WjyiZQzXNSMs2sZKQYE3Yh9E0-hWSJ-59FpeDZOGaWLJY4V6niwzePkdSbdtE7jPxHYJjlp7dC6SPMQ4Ekk9fmEuTAJIIktospbckU9u0tB-0gOiGhrBJdUEaiI14PDlFxZHdeXqOaieKYKRw9u54oIPFf4u8uxXXnUoEvXqAwiDOp4Ewrm7N4J2DbnqZ3KAaV1I6t_6yCfoFOCoIZL42sINtRULr2FQ3pbU1GZ_V5w6gwZi_VIEnVqN6ZSCrsMZap-nxTlKYRM70hhdxIajVaERKZyrGZJqp16hEcOQxnKpxqkLUQuPVUkH6500IS1jAMZEqcjoTaHDPOl7SF0C3mUDdZhkCItNo_OCNfPhEyPVAB5KHd3zu4Zu7G3wMC6aX1N1_gvTiZMjmlCkgYuYyArC-0XC05gVXnyZ-cARwMk8; ffcp=a.1.0_f.1.0_p.1.0_c.1.0; ub=4B11AD7BE794EA6E5FB723B147797F57; usr-gender=249; checkoutType2=4; session-1=bf494fa6-af13-e012-feb1-faf56be446b6; ff_newsletter=1; SSP_AB_PDP_Design_20171215=Control; SSP_AB_calculator_vs_sud=sud; __gads=ID=a9e09e43423bb4bc:T=1644951288:S=ALNI_MaeidzTyy8G77WsQeXQwTQr4O5YIw; _gcl_au=1.1.771614651.1644951328; _ga=GA1.1.1866341603.1644951290; _ym_uid=164495134961719669; _ym_d=1644951349; rskxRunCookie=0; rCookie=rccwvzv3bhh74wtoj4g2rkzohkbdr; _fbp=fb.1.1644951361246.2061591452; _cs_c=0; _qubitTracker=l1o0g8ixx5c-0kzohlhpe-pkcdbzg; qb_generic=:X7+vo3h:.farfetch.com; __utmz=other; yti=search_trademark_[ru]_[ru]; BISessionId=f64961d7-26f2-7833-14cb-3072cb0a15aa; ABProduct=419:0#703:0; ABListing=; ABGeneral=7541:1#7542:1; ABLanding=; ABCheckout=; ABRecommendations=; ABReturns=; ABWishlist=; __Host-CSRF-TOKEN=CfDJ8BZV7bSK_gVKoJ5_tFR15T6T8mHmJWBKWkY9Ga0kINp49ZjE1uOtGYBkpnKobcbc-XUZ53JCxatwhCqdcRKfIHxoDtFaYb8BzlQ1nMrKq79LQL3jjBte77Y4wztqD44y9Xx_8gg48wMYKX2Rk4khrOg; __Host-FF.AppSession=CfDJ8BZV7bSK/gVKoJ5/tFR15T49lHLa5xSNeBqiYN+kTb+GVMnbMQf5AgZgzIODrNu+4u+Thf9YLVMeE5oEQXs/KO+6HL6SqGvcRdj1scWi5Z8j8me8q8bNRqgJzsQpHeL2+5l3Zpdi2yBNYKhMOLs6nAW48E+eFQHk/UhwaUsYdZ2K; AKA_A2=A; bm_sz=674BE3A38CC189AA68E420DF2F99AF09~YAAQlAVJF83LOA1/AQAA1cCrDQ7RDX/2LlRtgISLIdN86CGDHQpeLTe0G0j3M7HqVgF9korwd2jAKw8xAsQG/YUbFjMd6XTwvdKW2Y06uMtYG8WKFpv6KHpJUKBGIyXNlkPj5wdkG/GBkzTQFjO6Q93laONSoXFgV0WpzxrfKyZwfo80wHuH6+c086pRvtpzOlVEHTwfAronZz+Pw43DuOfLEuWtzblUUhH3BynjWLhOMwN5zf84sh9OxB4D/P+wEzaEYaRf8XR357vVDDjFwsV1ItJJaaZ/0oJFTl98bHfJNKyCiw==~4277813~3553333; AkamaiFeatureToggle=3aa8d2.0_4ae381.0_64d19c.1_6b3b8f.1_adcf8c.1_d5d78d.1_e605eb.-1_f870d6.-1_fdbb7a.-1; ak_bmsc=B253C08FCB4965B1E8CA7E682F7A0B8C~000000000000000000000000000000~YAAQlAVJF2HOOA1/AQAAre+rDQ5vHjxXPtG9xFT5uC7xVCGSxaoiU4AQwpWmS2QQmZO3Dly1r4OUdfqMkkQLqyMkyzdPvcwtNzv7Z5w6hh5vDHlhAwYdBMQ40LmTPH1fOSKWJAGA4MFB+eodqeSU0sqQYs80fBYaWGRHnkwTp2KQjByKoNcGOnWXd9JfSS+1fSolYL3cxlNtz1A0v4ruocFMl0uQNSt+tHxM6Pd2G++m37E31LsZahQbnfZPXfiqI/Agi1Cmp+D7VYSHmhhVJKplZPcvcDCLdOUHI6l/KrstnzluGrO90rqM7ADXq/E99ldPeAiSLxFs23MMU24mtfXo3pB7qvyMvB0ZhI599Ps6wAcvUZCluA5hr5Av9huqEqE234mK4CllqEeLCp21dmlWoijuS2IibD0o7Xb7KIHcVJb3lxAE5Z/V5AS21gt2SkmaGyl67GZSar7jQzSKZuhElnjGi77Esk/KcXlCMatfNSwOaPexGkfc7hlhqQ==; RT="z=1&dm=www.farfetch.com&si=a02d5370-e420-4413-89e9-36886b8f0d9e&ss=kzsmp1bp&sl=1&tt=bl2&rl=1&ld=bl5"; _cs_mk=0.3005549431223864_1645201851373; _sp_ses.b865=*; __cuid=1d360950a39e4bdc89e4daae8500acb7; _uetsid=dbc537c0902411ec8191abe72e26864f; _uetvid=ecc574708e9011ecb321e904ea702ad6; _abck=B36DF29306BF1307F9CDED3D36D82E4E~-1~YAAQlAVJFwTPOA1/AQAAI/qrDQf6q/NDk+050QPmYY1yKpR3/SzLfcDkW1xEm6Nk3CFeWot85zGjFC6BZCV8HunVNa+hKGcqvxcGO+fiCTaPd6rEMf6mLOlvqxKv4hS/CjbSm3ue1YaNZcWpanx3ujLTI0x2T+PsLpuDVSoE0ZNwmUhcIMVCGhGiVaB0mXVzwoBXeO8pTbw11mekXFMOta6ZeGu/vVmdtIUoxxin57eCVS23sRhLoAVLHCFMoavodSeqpPX/Riycb57gJgxFQLLLPdc9qSxCxc8Tm9jlH5vdeIJ7ockiOphfJr8wvu2mZ+smq36nhmVOzY8M2ZTtfSTG7NG2/0j3eIhDd8juEKR/s4304iVmilsBIqRuwRUgOBWGmr2AZA7gyn4Q~-1~-1~-1; _sp_id.b865=a404f458-4b23-4d29-8c85-bc79e5b6ce4a.1644951282.5.1645201856.1645129357.b9db3546-edf1-4246-93de-895a5481af74; _cs_id=0734e621-8153-a039-fb18-093af7ab8bfc.1644951372.9.1645201856.1645201856.1.1679115372469; _cs_s=1.0.0.1645203656339; __Host-CSRF-REQUEST-TOKEN=CfDJ8BZV7bSK_gVKoJ5_tFR15T5vqfZ9D_bDQ3ZfGQ4WyfGCwfj4_coGMSYU88w5kmVL3QKAubscMtLrH-UhQjO45b2YqQpSR0qSKBBHaqqqqmnZIBruN6LaxCi2ltIGmRfBedqfcL0nxJw2m_UkJHyI0wTdMd4LXZ_MIQwlm4do2X0rUzd_XRX7pSXa1vJNRwnNGA; bm_sv=808B9AD74A1CD542110CEEA189AC5053~U+n7oag87G0xLLkTDq0XwrfsNwFEYztBgBG6yqnkGwl9jcojtWHl3ytueg3AeEUZYNcHfFhBKPwueZWlY0LxrQGK6ehbrL7khtzFvoz0Tfw1bxedT+zkObYtKae6wA6U6EiCjFqF3a681WsTeHCLmcHoRU3nujKPSetWmymDyPE=; _ga_CEF7PMN9HX=GS1.1.1645201851.9.0.1645201851.60; qb_session=1:1:7::0:X8NrCj5:0:0:0:0:.farfetch.com; qb_permanent=l1o0g8ixx5c-0kzohlhpe-pkcdbzg:17:1:7:3:0::0:1:0:BiC/dy:BiD8nF:A::::217.66.157.182:st petersburg:18964:russian federation:RU:59.91:30.31:northwestern:643003:sankt-peterburg:12129:migrated|1645201861494:::X8NrCt2:X8NrCj5:0:0:0::0:0:.farfetch.com:0; cto_bundle=63Kb0l9rYWxtQ0FHYVVlbEFzRVl1ZXIlMkJrZGNlTjZKMkslMkZtR2x2dHp6RjRxTnhRWHUwZHM0dWhlYms0YXVqNiUyQjh4WmU1d2JHcWY4V1VhNHFVQzFOSiUyQjB2NVpoczFmaEx1aVVwcFdFV0clMkJFaThsRExvdGpMZ04wWnU0dzVpSGJIOWtoWWFqdW9KZmtZRXMyJTJGTlRDVFA3RlQzJTJCQSUzRCUzRA; lastRskxRun=1645201867145; forterToken=fa6a9c1459e94d7ea51d7aa38a43e419_1645201851262__UDF43-mnf_11ck',
    'accept' : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br,",
    "accept-language": "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7",
}

// const url = 'https://www.farfetch.com/ru/shopping/women/dolce-gabbana-carretto-item-17690928.aspx?storeid=13098'
const url = "https://www.farfetch.com/ru/shopping/women/off-white-vulcanized-item-17590452.aspx?storeid=12572" // f11.html

const fetching = (url) => fetch(url, {"headers": headers}) 


app.get('/fetching', (req, res)=>{
    console.log(colors.bgBlue('incoming "/fetching" '))
    console.log(req.headers)
    res.send('<h1>OK2</h1>')
})



app.get('/', async (req, res) => {
    console.log(colors.bgGreen('incoming "/" '))
    try{
        const response =  await fetching(url)
        const str = await response.text()
        fs.writeFile('./goods/f11.html', str, ()=>{})
    } catch (err) {
        console.log(`error = ${err}`)
    }
    res.send('<h1>OK1</h1>')
})


app.listen(port, ()=> console.log(`listening on ${port} port`))