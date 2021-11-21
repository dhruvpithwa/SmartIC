function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

function getBookings(filterObj){

    $.get("https://floating-savannah-59258.herokuapp.com/product",{...filterObj}, function(data, status){

        const product = data.data

        if(data.status == 200)
        {
            let productHTML = '';
        
                if(product.length > 0){
                    
                    product.forEach(obj => {
                        
                        const text = `
                        
                        <div class="col-md-2 card m-4">
                            <div class="row">
                                <div class="mt-3 ml-3 mr-3">
                                    <img class="card-img-top product_img" src="./sample.jpg" alt="Card image">
                                </div>    
                                <div class="card-body">
                                    <h5 class="card-title capitalize">${(obj.name)}</h5>
                                    <h5 class="card-subtitle text-muted">Rs ${obj.price}</h5>
                                    <br>
                                    <h6 class="card-subtitle">Description</h6>
                                    <p>${obj.description}</p> 
                                </div>
                            </div>
                        </div>
                        
                        `;
                        productHTML = productHTML.concat(text)
                        

                    })

                    document.getElementById('product-catalog').innerHTML = productHTML
                
                }else{

                    productHTML =  `
                
                        <h2> No Products Found! </h2>
            
                        `;
                    document.getElementById('product-catalog').innerHTML = productHTML
                }
            

        }else{

            let err = '';
            err =  `
                
            <h2> Error 400, Not Found </h2>
            
            `;
            document.getElementById('product-catalog').innerHTML = err
        }       
    })
}





$( document ).ready(function() {
    getBookings(null);
})    
    

$(function() {
    $('#search').on("input",function() {
        const q = ($(this).val())
        getBookings({'q':q});         
    })
})
