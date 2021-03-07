import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const Home = (props) => {
  // ***************************************  Use State  *********************************
  const [isOpen, setIsOpen] = useState(false);
  // const [refresh, setRefresh] = useState(false);
  const [menus, setMenus] = useState({});
  const [totalPrice, settotalPrice] = useState(0);
  const [totalItem, settotalItem] = useState(0);

  // ****************************************  Use Effect ********************************
  useEffect(() => {
    if (!localStorage.getItem("menu"))
      localStorage.setItem("menu", JSON.stringify({}));
  }, []);

  useEffect(async () => {
    await fetch(`/api/menu/${props.match.params.Restname}/`)
      .then((res) => res.json())
      .then((data) => setMenus(data));
  }, []);

  // **************************************  Use Function **********************************
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
  const called = (id, name, price) => {
    let item = [id, name, price];
    let menu = JSON.parse(localStorage.getItem("menu"));
    if (!menu[id]) {
      item.push(1);
      menu[id] = item;
    } else menu[id] = item;
    localStorage.setItem("menu", JSON.stringify(menu));
    // setRefresh((prevRefresh) => !prevRefresh);
    totalPriceOfOrder();
  };

  const handlePlusMinus = (id, op) => {
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
    // setRefresh((prevRefresh) => !prevRefresh);
    totalPriceOfOrder();
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

  const generateAddDish = (id, name, price) => {
    let menu = JSON.parse(localStorage.getItem("menu"));

    if (menu[id]) {
      return (
        <Fragment>
          <button class="minus" onClick={() => handlePlusMinus(id, "-")}>
            -
          </button>
          <span>{menu[id][3]}</span>
          <button class="plus" onClick={() => handlePlusMinus(id, "+")}>
            +
          </button>
        </Fragment>
      );
    }
    return (
      <div id={id} class="addtodish">
        <p id={id} class="checkout" onClick={() => called(id, name, price)}>
          ADD TO DISH
        </p>
      </div>
    );
  };

  const generate = () => {
    let final = [];

    Object.keys(menus).forEach(function (key) {
      final.push(
        <div class="categorytitle" id={key}>
          <p>{key}</p>
        </div>
      );
      menus[key].map((menu) =>
        final.push(
          <Fragment>
            <div class="item">
              <div class="itemimg">
                <img src={menu.item_image} alt="burger" />
              </div>
              <div class="itemdesc">
                <p class="title" id="name">
                  {menu.item}
                </p>
                <p class="desc">{menu.item_desc}</p>
                <div class="price">
                  <p class="rs" id="price">
                    Rs. {menu.item_price}
                  </p>
                  {generateAddDish(menu.id, menu.item, menu.item_price)}
                </div>
              </div>
            </div>
            <div class="horizontal">
              <hr />
            </div>
          </Fragment>
        )
      );
    });
    return final;
  };
  return (
    <div>
      {/* Nav-bar Section */}
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />

      {/* main container */}
      <div class="container">
        <div class="container_content">
          {/* Search Section */}
          <div class="searchbar">
            <div class="search">
              <span>
                <input type="text" placeholder="Search here..." />
                <div class="searchicon">
                  <img
                    src="/static/images/loupe.svg"
                    alt="search"
                    class="icon"
                  />
                </div>
              </span>
            </div>
            <div class="tableno">
              <p>Table No 1</p>
            </div>
          </div>
          {/* Carousel Category section */}
          <div class="category">
            <span class="carousel owl-carousel">
              <a href="#Burger">
                <div class="cat">
                  <div class="catimg">
                    <img src="/static/images/hamburger.svg" alt="hamburger" />
                  </div>
                  <p class="catname1" to="Burger">
                    Burger
                  </p>
                </div>
              </a>
              <a href="#Kathiyawadi">
                <div class="cat">
                  <div class="catimg">
                    <img src="/static/images/pizza.svg" alt="hamburger" />
                  </div>
                  <p class="catname">Kathiyawadi</p>
                </div>
              </a>
            </span>
          </div>
          {/* Menu Category with Menu Listing */}
          <div class="menu">
            <div class="productslist">{menus !== {} ? generate() : null}</div>
          </div>
        </div>
      </div>
      {/* Checkout Fixed Footer */}
      <footer class="footer">
        <div class="footer_content">
          <div class="foot_left">
            <p class="total_qty">
              <span id="checkout">{onRefreshTotal('item')}</span> Items{" "}
              <span>
                <small>In Dish</small>
              </span>
            </p>
            <p class="totalrs">Total : {onRefreshTotal('price')} Rs.</p>
          </div>
          <div class="foot_right">
            <span class="checkout">
              <p>CHECKOUT</p>
              <div class="check_btn">
                <img src="/static/images/rightarrow.svg" alt="" />
              </div>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
