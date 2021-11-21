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

                                <div class="m-4">
                                    <img class="card-img-top product_img" src="./sample.jpg" alt="Card image">
                                </div>    
                                <div class="card-body">
                                    <h5 class="card-title capitalize">${(obj.name)}</h5>
                                    <h5 class="card-subtitle text-muted">₹ ${obj.price}</h5>
                                    <br>
                                <a class="card-subtitle" href="/${(obj.id)}">Read more</a>
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
