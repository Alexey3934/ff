
$(function() {
  $.get("/db.Product", function(Product) {
    Product.forEach(Product => {
      console.log(Product)  
      $("<li></li>")
        .text(`Product.name = ${Product.name} -------  Product.link =   ${Product.link}`)
        .appendTo("ul#Product");
    }); 
  });
});

$(function() {
  $.get("/db.Custumer", function(Custumer) {
    Custumer.forEach(Custumer => { 
      $("<li></li>")
        .text(`Custumer.id = ${Custumer.id} ---       Custumer.name =  ${Custumer.name}`)
        .appendTo("ul#Custumer");
    }); 
  });
});

$(function() {
  $.get("/db.CustumerWithProduct", function(CustumerWithProduct) {
    CustumerWithProduct.forEach(CustumerWithProduct => {  
      $("<li></li>")
        .text(`CustumerWithProduct.generatedLink = ${CustumerWithProduct.generatedLink} ----------        CustumerWithProduct.trackNumber =  ${CustumerWithProduct.trackNumber}  ---       CustumerWithProduct.state =  ${CustumerWithProduct.state}`)
        .appendTo("ul#CustumerWithProduct");
    }); 
  });
});
