import React, { Fragment, useState } from "react";
import parse from "html-react-parser";

const getData = () => {
  const [totalPrice, settotalPrice] = useState(0);
  const [totalItem, settotalItem] = useState(0);
  let check = localStorage.getItem("totalprice");
  console.log("hii", check);
  if (localStorage.getItem("menu") && check != "0") {
    const onRefreshTotal = (arg) => {
      if (arg === "price") {
        if (localStorage.getItem("totalprice")) {
          return localStorage.getItem("totalprice");
        } else {
          return totalPrice;
        }
      } else {
        if (localStorage.getItem("totalitem")) {
          return localStorage.getItem("totalitem");
        } else {
          return totalItem;
        }
      }
    };
    const totalPriceOfOrder = () => {
      let menu = JSON.parse(localStorage.getItem("menu"));
      console.log(menu);
      let defaulttotal = 0;
      let defaulttotalItem = 0;
      for (var i in menu) {
        defaulttotal = defaulttotal + menu[i][2] * menu[i][3];
        defaulttotalItem = defaulttotalItem + menu[i][3];
      }
      localStorage.setItem("totalprice", defaulttotal);
      localStorage.setItem("totalitem", defaulttotalItem);
      settotalPrice(defaulttotal);
      settotalItem(defaulttotalItem);
    };
    const handlePlusMinus = (op, id) => {
      console.log(op, id);
      let menu = JSON.parse(localStorage.getItem("menu"));
      let item = menu[id];
      let qty = item.pop();
      if (op === "-" && qty === 1) {
        delete menu[id];
      } else if (op === "-") {
        item.push(qty - 1);
        menu[id] = item;
      } else {
        item.push(qty + 1);
        menu[id] = item;
      }
      localStorage.setItem("menu", JSON.stringify(menu));
      totalPriceOfOrder();
    };
    let menu = JSON.parse(localStorage.getItem("menu"));
    let totalPrice = localStorage.getItem("totalprice");
    let totalItem = localStorage.getItem("totalitem");

    const getMenu = () => {
      let menuStr = [];
      for (var i in menu) {
        let a = menu[i][0];
        menuStr.push(
          <li>
            {menu[i][1]}{" "}
            <button onClick={() => handlePlusMinus("-", a)}>-</button>{" "}
            <p id={a}>{menu[i][3]}</p>{" "}
            <button onClick={() => handlePlusMinus("+", a)}>+</button>{" "}
            {menu[i][3] * menu[i][2]}
            <button>x</button>
          </li>
        );
        //   defaulttotalItem = defaulttotalItem + menu[i][3];
      }
      // console.log(parse(menuStr));
      console.log(menuStr);
      return menuStr;
    };

    return (
      <div>
        <p>Total Price Is {onRefreshTotal("item")}</p>
        <p>Total Item Is {onRefreshTotal("price")}</p>
        <ul>{getMenu()}</ul>
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
