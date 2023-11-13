function createCartItem(book)
    {
    var card = document.createElement("div");
    card.classList.add("bookCard");

    var cardTitle = document.createElement("h4");
    cardTitle.innerHTML = `Title: ${book.title} - Author: ${book.author}`;

    var cardPrice = document.createElement("h4");
    cardPrice.innerHTML = `Price: ${book.price}`;

    var cardBtn = document.createElement("button");
    cardBtn.classList.add("btn");
    cardBtn.classList.add("btn-primary");
    cardBtn.innerHTML = "Remove from cart"
    cardBtn.onclick = function (e) { removeFromCart(e, book.id) };

    card.appendChild(cardTitle);
    card.appendChild(cardPrice);
    card.appendChild(cardBtn);

    var container = document.getElementById("cartItemContainer");
    container.appendChild(card);
    }

    function removeFromCart(event, bookId){
      localStorageService.remove('cartItems', bookId);
      event.target.parentElement.remove();
  }


function initCart()
{
    var cartItems = localStorageService.getAll("cartItems");
    
    cartItems.forEach(x => {
        console.log(x);
        axios.get(`https://localhost:44372/api/books/${x}`)
        .then(function (response) {
          createCartItem(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }); 
}

function orderBooks(){
  var name = document.getElementById("customerName").value;
  var email = document.getElementById("customerEmail").value;
  var address = document.getElementById("customerAddress").value;
  var phone = document.getElementById("customerPhone").value;

  var bookIds = localStorageService.getAll('cartItems');

  var data = {
    fullName : name,
    email : email,
    address : address,
    phone : phone,
    bookIds : bookIds
  }


  axios.post('https://localhost:44372/api/orders' , data)

  .then(function (response) {
    alert(`Thanks for ordering.`);
            localStorageService.clear("cartItems");
            location.href = "index.html"
  })
  .catch(function (error){
    console.log(error);
  })
}
  
  
   
  




initCart();
    

