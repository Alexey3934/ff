
const express             = require('express');
const db                  = require('../models/index.js');
const sequelize           = db.sequelize;
const colors              = require('colors')
const Custumer            = db.Custumer;
const Product             = db.Product;
const CustumerWithProduct = db.CustumerWithProduct;
const fs                  = require('fs')

const CSSselect = require("css-select");
const render = require("dom-serializer").default;
const updating_db = require('./updating_db_10s')
const htmlparser2 = require('htmlparser2')

var   app        = express();
const path       = require('path')
 
const AdminBro          = require('admin-bro')
const AdminBroExpress   = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize');
const { includes } = require('lodash');

app.use(express.static("222"));

// var urlencodedParser = bodyParser.urlencoded({ extended: false });

//////////////////////////////////////////////////////// ///////////////////////////////////

// sequelize

sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection established.".bgBlue);
    sequelize.sync()
    // sequelize.sync({force: true})

  
  })
  .catch(function (err) {
    console.log("Unable to connect to database: ", err);
  });


AdminBro.registerAdapter(AdminBroSequelize);

////////////////////////////////////////////////////////////////////////////////////////////////

//  admin bro

const adminBro = new AdminBro({
  // databases: [db],
  resources: [
    
    
    {
      resource: Custumer,
      options: {
        properties: {
          id: { isTitle: false },
          name: { isTitle: true },
          createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
        }
      }
    },


    {
      resource: Product,
      options: {
        actions: {edit: {isVisible: false}},
        properties: {

          // newProperty: {
          //   isDisabled: true,
          // link: {   isVisible: { list: true, filter: true, show: true, edit: false },},  
          // },
          // trackNumber: { isTitle: true },
          createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
          // dataFromLink : { isVisible: false },
          // dataFromLink: {edit: false}
          dataFromLink: {isDisabled: true}
        }
      } 
    },
    {
      resource: CustumerWithProduct,
      options: {
        properties: {
          createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
          ProductId: { isVisible: false },
          CustumerId: { isVisible: false },
          string_to_url: {isDisabled: true},
          state: { availableValues: [
            {value: 'Проверка заказа', label: 'Проверка заказа'},
            {value: 'Заказ обрабатывается', label: 'Заказ обрабатывается'},
            {value: 'Заказ отправлен', label: 'Заказ отправлен'},
            {value: 'Заказ доставлен', label: 'Заказ доставлен'},
          ]}
        }
      }
    },
  ],

  rootPath: '/admin',
})
const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

///////////////////////////////////////////////////////////////////////////////////////////////

// ///////////////////////////////////////////////////////////////////////





async function update_dom(str_main, str_embe, str_end, name_of_custumer) {

              const array_of_all = await CustumerWithProduct.findAll({include: [Product, Custumer]})
            // если db is empty
              if (array_of_all[0] == undefined) return {'': '<h1>db is empty</h1>'}

              let result_str = str_main
              const arr_of_str_embe = []
              const arr_of_sum_items = []



            // переформат имени
              if (name_of_custumer.includes("_")) name_of_custumer = name_of_custumer.replaceAll('_', ' ')
            // фильтр
              const array_of_custumer_name = array_of_all.filter((el)=> el.Custumer.name == name_of_custumer)

            const quontity_of_items = array_of_custumer_name.length
            let counter = 1






// редактирование средних частей 
              array_of_custumer_name.forEach(item => {
              
              
                const dom_embe = htmlparser2.parseDocument(str_embe)
              // console.log(dom_embe)
              
                  // item.Product.dataFromLink
                // const item =  array_of_all[array_of_all.length - 1]
              
              // данные после парсинга from, money, articul, img, name, storied
                const data_from_link = JSON.parse(item.Product.dataFromLink)
                // update дата заказа из departureDate
                  const departure_date = CSSselect.selectOne('#date_of_pay', dom_embe)
                  departure_date.children[0].data = item.departureDate
                // update номер заказа из trackNumber
                  const track_number = CSSselect.selectOne('#track_number', dom_embe)
                  track_number.children[0].data = item.trackNumber
                // update статус из state
                  const first_state         = CSSselect.selectOne('#first_state', dom_embe)
                  // console.log(first_state)
                  const second_state        = CSSselect.selectOne('#second_state', dom_embe)
                  const third_state         = CSSselect.selectOne('#third_state', dom_embe)
                  const fourth_state        = CSSselect.selectOne('#fourth_state', dom_embe)
                  const state_data          = item.state
                  // const state_element       = id="first_starus"
                  const state_line          = CSSselect.selectOne('#state_line', dom_embe)
                  const state_icon          = CSSselect.selectOne('#state_icon', dom_embe)
                  const state_circle_second = CSSselect.selectOne('#circle_second', dom_embe)
                  const state_circle_third  = CSSselect.selectOne('#circle_third', dom_embe)
                  const state_circle_fourth = CSSselect.selectOne('#circle_fourth', dom_embe)
                  // state_element.children[0].data = state_data    
                  switch (item.state) {
                    case "Проверка заказа": 
                      first_state.attribs['font-weight'] = 'bold';
                      state_line.attribs.x2 = '20%';
                      state_icon.attribs.x  = '19%';
                      state_circle_second.attribs.fill = 'white'
                      state_circle_third.attribs.fill  = 'white'
                      state_circle_fourth.attribs.fill = 'white'
                      break;    
                    case "Заказ обрабатывается":
                      second_state.attribs['font-weight'] = 'bold';
                      state_line.attribs.x2 = '40%';
                      state_icon.attribs.x  = '39%'
                      state_circle_second.attribs.fill = 'black'
                      state_circle_third.attribs.fill  = 'white'
                      state_circle_fourth.attribs.fill = 'white'
                      break;
                    case "Заказ отправлен":
                      third_state.attribs['font-weight'] = 'bold';
                      state_line.attribs.x2 = '60%';
                      state_icon.attribs.x  = '59%'
                      state_circle_second.attribs.fill = 'black'
                      state_circle_third.attribs.fill  = 'black'
                      state_circle_fourth.attribs.fill = 'white'
                      break;    
                    case "Заказ доставлен":
                      fourth_state.attribs['font-weight'] = 'bold';
                      state_line.attribs.x2 = '80%';
                      state_icon.attribs.x  = '79%'
                      state_circle_second.attribs.fill = 'black'
                      state_circle_third.attribs.fill  = 'black'
                      state_circle_fourth.attribs.fill = 'black'
                      break;
                  }
                //fill money 
                    const money_element = CSSselect.selectOne('#money', dom_embe)
                    money_element.children[0].data = data_from_link.money
                    const to_num = Number(data_from_link.money.replaceAll(/[^\d]+/g, ''))
                    arr_of_sum_items.push((to_num))
                // fill img
                    const img_el = CSSselect.selectOne('#img', dom_embe)
                    img_el.attribs.src = data_from_link.img
                // fill name of product
                    const name_of_product = CSSselect.selectOne('#name_of_product', dom_embe)
                    console.log(name_of_product)
                    name_of_product.children[0].data = data_from_link.name
                // brand
                    const brand = CSSselect.selectOne('#brand', dom_embe)
                    brand.children[0].data = data_from_link.brand
                //fill артикул
                    const articul = CSSselect.selectOne('#articul', dom_embe)
                    articul.children[0].data = "Артикул " + data_from_link.articul
                // fill размер
                    const size = CSSselect.selectOne('#size', dom_embe)
                    size.children[0].data = "Размер : " + item.size
                // fill количество
                    const quantity = CSSselect.selectOne('#quantity', dom_embe)
                    quantity.children[0].data = "Количество : " + item.quantity
                // fill ожидаемая дата доставки
                    const delivery = CSSselect.selectOne('#delivery', dom_embe)
                    delivery.children[0].data = item.timeOfDelivery
                // fill доставка из
                    const from = CSSselect.selectOne('#from', dom_embe)
                    from.children[0].data = " из " + data_from_link.from
                // последняя точка регистрации
                    //  const last_place = CSSselect.selectOne('#last_place', dom_embe)
                    //  last_place.children[0].data = item.last_point_place
                // последнее место отслеживания 
                    //  const number_of_view = CSSselect.selectOne('#number_of_view', dom_embe)
                    //  number_of_view.children[0].data = item.number_of_view
                // курьер 
                    //  const courier = CSSselect.selectOne('#courier', dom_embe)
                    //  courier.children[0].data = item.courier
                // количество посылок 1 из 2 например
                      const quontity_items_el = CSSselect.selectOne('#quontity_items', dom_embe)
                      if (quontity_of_items == 1) {
                        quontity_items_el.children[0].data = 'Одна посылка '
                      } else if (quontity_of_items > 1) {
                        quontity_items_el.children[0].data = `Посылка ${counter} из ${quontity_of_items}`
                        counter++
                      }
     








                  str_embe_new = render(dom_embe)
                
                  arr_of_str_embe.push(str_embe_new)
                });
              
                arr_of_str_embe.forEach((str_embe_new)=> result_str += str_embe_new)
              
              
              
              
              
              
// заполняю 3-ю часть
              
              
              const dom_end    = htmlparser2.parseDocument(str_end)
              const cust = await Custumer.findOne({where: {name: name_of_custumer}})
              if (cust) { 
              
                  // имя
                  const name_of_custumer_el  = CSSselect.selectOne('#name_of_custumer', dom_end)
                  name_of_custumer_el.children[0].data = name_of_custumer
              
                  // страна
                  const country_el  = CSSselect.selectOne('#country_of_custumer', dom_end)
                  country_el.children[0].data = cust.country
                  // улица город индекс
                  const city_el =     CSSselect.selectOne('#city', dom_end)
                  city_el.children[0].data = cust.city_square_index
              

                  // количество изделий
                  const cuontity_of_items = CSSselect.selectOne('#quontity_of_items', dom_end)
                  let items_length = String(array_of_custumer_name.length)
                  if (items_length == 1) { 
                    items_length =  String(items_length) + ' изделие'
                  } else if (items_length < 5) {
                    items_length =  String(items_length) + ' изделия'
                  } else {
                    items_length =  String(items_length) + ' изделий'
                  }
                  cuontity_of_items.children[0].data = items_length

// сумма товаров без доставки
                  const summ_items_el =     CSSselect.selectOne('#summ_of_items', dom_end)
                  let sum_items = 0
                  for(item of arr_of_sum_items) {
                    sum_items += item
                  }
                  const sum_items_with_delivery = sum_items + 2000


                  const formatting_num = (items) => {
                    console.log(colors.bgGreen("items = ", items))

                    const rev = String(items).split("").reverse().join("");
                    console.log(colors.bgGreen("rev = ", rev))

                    
                    let formatting = ''

                    for (i = 0; rev.length > i; i++) {
                      console.log((i % 3 == 0 ))
                      if ((i % 3 == 0 ) && (i != 0)) formatting += ' '
                      formatting += rev[i]
                    }
                    console.log(colors.bgGreen('formatting = ', formatting))

                    const result = formatting.split("").reverse().join("");
                    console.log(colors.bgGreen(result + ",00 ₽"))
                    return result + ",00 ₽"
                  }    
                  
                  


                  summ_items_el.children[0].data = formatting_num(sum_items) 
                  
// cумма товаров с доставкой 
                  const summ_items_el_with_delivery =     CSSselect.selectOne('#sum_with_delivery', dom_end)
                  summ_items_el_with_delivery.children[0].data = formatting_num(sum_items_with_delivery)
              }












                  const str_end_new = render(dom_end)
             result_str += str_end_new

              
              return result_str
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// only for demo

// Send user data - used by client.js
app.get("/db.Product", function (request, response) {
  Product.findAll().then(function (Product) {
  response.send(Product); // sends users back to the page
  });
});

// Send user data - used by client.js
app.get("/db.Custumer", function (request, response) {
  Custumer.findAll().then(function (Custumer) {
  response.send(Custumer); // sends users back to the page
  });
});


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// Serve the root url: http://expressjs.com/en/starter/basic-routing.html
app.get("/:custumer_name", async function (request, response) {
  const name_of_custumer = request.params['custumer_name']
  console.log(colors.bgGreen(name_of_custumer))


  let str_main = fs.readFileSync(path.resolve(__dirname,  '../222/222.html'), 'utf8')
  let str_embe = fs.readFileSync(path.resolve(__dirname,  '../222/222vstavka.html'), 'utf8')
  let str_end = fs.readFileSync(path.resolve(__dirname,  '../222/222end.html'), 'utf8')
  




  const str_new = await update_dom(str_main, str_embe, str_end, name_of_custumer)
  // response.sendFile(path.resolve(__dirname, '../222/222.html'));
  
  response.send(str_new)
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Listen on port 8000
var listener = app.listen(8000, function () {
  console.log("Listening on port " + listener.address().port);
});
