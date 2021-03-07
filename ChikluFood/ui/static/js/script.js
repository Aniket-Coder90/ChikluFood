$(".carousel").owlCarousel({
  stagePadding: 20,
  loop: true,
  autoplay: false,
  margin: 0,
  // autoplayTimeout:3000,
  // autoplayHoverPause: true,
  // responsiveClass:true,
  responsive: {
    0: {
      items: 2,
      nav: false,
    },
    480: {
      items: 3,
      nav: false,
    },
    1024: {
      items: 5,
      nav: false,
    },
  },
});


 // When we click on plus or minus button navigate value
 $(".addtodish").on("click", "button.minus", function () {
   console.log("hiiii")
  a = this.id.slice(7);
  console.log(a)
  checkout["pr" + a][0] = checkout["pr" + a][0] - 1;
  checkout["pr" + a][0] = Math.max(0, checkout["pr" + a][0]);
  document.getElementById("valpr" + a).innerHTML = checkout["pr" + a][0];
  let count = document.getElementById(`valpr${a}`).textContent;
  let price = document.getElementById(`pricepr${a}`);
  updateChekout(checkout);
  if (count === "0") {
    document.getElementById(
      "divpr" + a
    ).innerHTML = `<button id="pr${a}" class="checkout" >ADD</button>`;
    localStorage.clear();
  }
});
$(".divpr").on("click", "button.plus", function () {
  a = this.id.slice(6);
  checkout["pr" + a][0] = checkout["pr" + a][0] + 1;
  document.getElementById("valpr" + a).innerHTML = checkout["pr" + a][0];
  let price = document.getElementById(`pricepr${a}`);
  updateChekout(checkout);
});