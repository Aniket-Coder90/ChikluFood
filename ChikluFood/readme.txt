function hello(name, id, element) {
    // console.log("Thai gayu");
    // console.log(name , price);
    // var y = document.getElementById('name').innerText;
    // console.log(y);
    if (localStorage.getItem("checkout") == null) {
      var checkout = [];
      var data = [`${name}`, `${id}`];
      checkout.push(data);
      localStorage.setItem("checkout", JSON.stringify(checkout));
      console.log(checkout);

      // localStorage.setItem('checkout', 'hii');
    } else {
      checkout = JSON.parse(localStorage.getItem("checkout"));
      // console.log(checkout);
      var data = [`${name}`, `${id}`];
      // console.log(data);
      checkout.push(data);
      localStorage.setItem("checkout", JSON.stringify(checkout));

      // console.log(`This is Final`, checkout);
    }
    console.log(checkout);

    // var h = id ;
    // console.log(id);
    // console.log(h);
    // document.getElementsByClassName('addtodish')[element].innerText = "Done";
    // console.log(element);
    // document.getElementById(element).innerHTML = "<p>Hoooo</p>";
    // localStorage.setItem(element, "hoo");
    // btnchange(element);
    updateChekout(checkout);

    // var idstr = this.id.toString();
    // console.log(idstr);
  }

  function updateChekout(checkout) {
    // var sum = 0;
    for (var item in checkout) {
        // sum = sum + checkout[item][0];
        console.log('hii',checkout[item][1]);
        if (checkout[item][1] !== 0)
        // console.log(document.getElementById('divpr1').innerText)
        console.log(item)
            document.getElementById('divpr1').innerHTML = `<button id='minus${item}' class='btn btn-primary minus'>-</button><span id='val${item}'>${checkout[item][1]}</span><button id='plus${item}' class='btn btn-primary plus'>+</button>`
    }
    localStorage.setItem('checkout', JSON.stringify(checkout));
    // document.getElementById('checkout').innerHTML = sum;
  };

  

  // function btnchange(element) {
  //   // console.log(element);
  //   var f = "ADD TO DISH";
  //   // document.getElementById('pr1').innerText = 'hello';
  //   var check = localStorage.getItem(element)
  //   console.log(document.getElementById(element));
  //   console.log(check)
  //   if (check  != null) {
  //     f = check;
  //   } 
  //   document.getElementById(element).innerText = f;
  // }

  // const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

  // let myRef = useRef(null)
  // var owlcategory = [];

  // const executeScroll = () => scrollToRef(myRef)
  const executeScroll = () => {
    // console.log("Clicked");
    // let xyz = document.getElementsByClassName('catname').innerHTML;
    // var x = document.getElementsByClassName("catname")[0].innerText;
    // document.getElementsByClassName("demo").innerHTML = x;
    // console.log(x);
    scrollToRef(myRef);
    // console.log(myRef);
  };

  ////////////////////////////////////////////////////////////////////////////////////








  import React, { Fragment } from "react";
import parse from "html-react-parser";

const getData = () => {
  if (localStorage.getItem("menu")) {
    let menu = JSON.parse(localStorage.getItem("menu"));
    let totalPrice = localStorage.getItem("totalprice");
    let totalItem = localStorage.getItem("totalitem");

    const handlePlusMinus = (name, qty, price, arg, id) => {
      // if (arg === "+") {
        console.log(`name: ${name}  quantity: ${qty}  price: ${price}  id: ${id}  arg: ${arg}`)
      // } else {
      //   console.log(`name: ${name}  quantity: ${qty}  price: ${price}  id: ${id}  arg: ${arg}`)
      // }
    };

    const getMenu = () => {
      let menuStr = "";
      let div = document.createElement('div');

      for (var i in menu) {
        let li = document.createElement("li");
        let minusbutton = document.createElement("button");
        let plusbutton = document.createElement("button");
        let itemname = document.createElement("p");
        let itemquantity = document.createElement("p");
        let itemprice = document.createElement("p");

        minusbutton.innerText = '-';
        plusbutton.innerText = '+';
        itemname.innerText = `${menu[i][1]}`;
        itemquantity.innerText = `${menu[i][3]}`;
        itemprice.innerText = `${menu[i][2]}`;
        
        minusbutton.onclick = function (){
          handlePlusMinus(menu[i][1], menu[i][3], menu[i][2], '-', menu[i][0])
        }
        plusbutton.onclick = function (){
          handlePlusMinus(menu[i][1], menu[i][3], menu[i][2], '+', menu[i][0])
        }
        
        li.appendChild(itemname)
        li.appendChild(minusbutton)
        li.appendChild(itemquantity)
        li.appendChild(plusbutton)
        li.appendChild(itemprice)

        li.style.display = 'flex';
        // menuStr += li.toString()
        div.appendChild(li)
        // document.getElementById('myul').appendChild(li);
      }
      console.log(typeof(div))
      menuStr=div.toString()
      return(
       menuStr
        )
    };
    return (
      <div>
      <ul id='myul'>{getMenu()}</ul>
        <p>Total Price Is {totalPrice}</p>
        <p>Total Item Is {totalItem}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Opps Sorry !!!!</h1>
        <p>Your Dish Is Empty😞</p>
      </div>
    );
  }
};

const checkout = () => {
  return (
    <Fragment>
      <h1>Hello Checkout page</h1>
      <h1>Total</h1>
      {getData()}
    </Fragment>
  );
};

export default checkout;
