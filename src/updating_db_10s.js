const db                  = require('../models/index.js');
const Custumer            = db.Custumer;
const Product             = db.Product;
const CustumerWithProduct = db.CustumerWithProduct;
const get_data            = require('../parser/parser.js')
// apdating db


let counter_updetes = 1

const updating_db = () => {

  setTimeout(() => {
    console.log('update every 2 sec '.green, counter_updetes++)
    async function fn() {



      const string_to_url_null = await CustumerWithProduct.findOne({include: [Product, Custumer], where: {string_to_url: null}})
    



      if (string_to_url_null) {

        let custumer_name = string_to_url_null.Custumer.name
        if (custumer_name.includes(" ")) custumer_name = custumer_name.replaceAll(' ', '_')
        custumer_name = '/' + custumer_name
        await CustumerWithProduct.update(
          { string_to_url: custumer_name },
          { where: { id:  string_to_url_null.id} }
        )
      }


      const product_data_null    = await Product.findOne({where: {dataFromLink: null}})
      await Product.destroy({where: {dataFromLink: 'invalid input of link field'}})
    
      if (product_data_null) { 
      
        const data = await get_data.fn(product_data_null.link)
        await Product.update(
            { dataFromLink: data },
            { where: { id:  product_data_null.id} }
          )
      }
      
      


    } 
    fn()         
    updating_db()  
  }, 2000);

}
updating_db()



module.exports.updating_db = updating_db;