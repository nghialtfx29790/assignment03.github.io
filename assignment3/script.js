"use strict";

const pdContainer = document.querySelector("#personal-description .row-cols-3");
const certificatesContainer = document.querySelector(
  "#certificates .row-cols-2"
);
const projectsContainer = document.querySelector("#projects .row-cols-3");
let widthOnChange = null;
let stickNavAllow = false;

const cardCollapse = document.querySelectorAll(
  '#personal-description [data-bs-toggle="collapse"]'
);
const cardCollapseContainer = document.querySelectorAll(
  "#personal-description .CardBorder"
);
const cardCollapseContent = document.querySelectorAll(
  '#personal-description [data-bs-toggle="collapse"] p'
);

const navBar = document.querySelector(".Navbar");
const navBarDropdown = document.querySelector(".Navbar");
let sticky = navBar.offsetTop + 50;

const submitButton = document.querySelector(".form button");
const formContainer = document.querySelector(
  "#career-goal-and-personal-info .Unvalidated"
);
const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const sideNav = document.querySelector(".SideNav");
const expandCollapseButton = document.querySelector(".openclosebtn");

// -----------------------------------------------------------------------------------------

// Đoạn code đo chiều rộng màn hình
function detectWidthChange() {
  const currentWidth = window.innerWidth;
  if (currentWidth !== widthOnChange) {
    widthOnChange = currentWidth;
    if (currentWidth > 1024) {
      pdContainer.classList.add("row-cols-3");
      pdContainer.classList.remove("row-cols-2");
      pdContainer.classList.remove("row-cols-1");

      certificatesContainer.classList.add("row-cols-2");
      certificatesContainer.classList.remove("row-cols-1");

      projectsContainer.classList.add("row-cols-3");
      projectsContainer.classList.remove("row-cols-1");
      stickNavAllow = true;
    } else if (currentWidth > 767) {
      pdContainer.classList.remove("row-cols-3");
      pdContainer.classList.add("row-cols-2");
      pdContainer.classList.remove("row-cols-1");

      certificatesContainer.classList.add("row-cols-2");
      certificatesContainer.classList.remove("row-cols-1");

      projectsContainer.classList.add("row-cols-3");
      projectsContainer.classList.remove("row-cols-1");
      stickNavAllow = true;
    } else {
      pdContainer.classList.add("row-cols-1");
      pdContainer.classList.remove("row-cols-2");
      pdContainer.classList.remove("row-cols-3");

      certificatesContainer.classList.add("row-cols-1");
      certificatesContainer.classList.remove("row-cols-2");

      projectsContainer.classList.add("row-cols-1");
      projectsContainer.classList.remove("row-cols-3");

      stickNavAllow = false;
    }
  }
}

window.onresize = detectWidthChange;
window.onload = detectWidthChange;

// -----------------------------------------------------------------------------------------

// Đây là đoạn code để tạo hiệu ứng “sticky” cho navigation bar.
window.addEventListener("scroll", function () {
  if (stickNavAllow) {
    if (window.scrollY > sticky) {
      // Khi người dùng lướt xuống vượt quá một khoảng cách nhất định, navigation bar sẽ chuyển từ trạng thái bình thường sang trạng thái “sticky".
      navBar.classList.remove("Navbar");
      navBar.classList.add("sticky");
      document.querySelector("#career-goal-and-personal-info").style.marginTop =
        "110px";
    } else {
      // Khi lướt trở lại, thanh điều hướng sẽ trở về trạng thái ban đầu.
      navBar.classList.add("Navbar");
      navBar.classList.remove("sticky");
      document.querySelector("#career-goal-and-personal-info").style.marginTop =
        "0px";
    }
  } else {
    document.querySelector("#career-goal-and-personal-info").style.marginTop =
      "0px";
  }
});

// -----------------------------------------------------------------------------------------

//Đoạn code xác thực biểu mẫu email
submitButton.addEventListener("click", function () {
  let form = document.getElementById("EmailForm").value;
  if (form == "") {
    alert("Form must be filled out");
  } else if (regex.test(form)) {
    formContainer.classList.add("Validated");
    formContainer.classList.remove("Unvalidated");
  } else {
    alert("Input must be in the correct format");
  }
});

// -----------------------------------------------------------------------------------------

//Đoạn code chuyển đổi trạng thái của navigation bar(mobile):
expandCollapseButton.addEventListener("click", function () {
  if (sideNav.classList.contains("Collapse")) {
    sideNav.classList.add("Expand");
    sideNav.classList.remove("Collapse");
  } else if (sideNav.classList.contains("Expand")) {
    sideNav.classList.remove("Expand");
    sideNav.classList.add("Collapse");
  }
});

// -----------------------------------------------------------------------------------------

for (let i = 0; i < cardCollapse.length; i++) {
  cardCollapse[i].addEventListener("click", function () {
    if (cardCollapseContent[i].innerHTML === "VIEW MORE") {
      // Khi người dùng nhấn vào một thẻ, nếu nội dung hiện tại của thẻ là “VIEW MORE”, code sẽ thay đổi nội dung thành “VIEW LESS” và chỉnh chiều cao của thẻ thành 100%.
      cardCollapseContent[i].innerHTML = "VIEW LESS";
      cardCollapseContainer[i].style.height = "100%";
    } else if (cardCollapseContent[i].innerHTML === "VIEW LESS") {
      // Ngược lại, nếu nội dung hiện tại của thẻ là “VIEW LESS”, code sẽ thay đổi nội dung thành “VIEW MORE” và thu gọn chiều cao của thẻ về mặc định
      cardCollapseContent[i].innerHTML = "VIEW MORE";
      cardCollapseContainer[i].style.height = "auto";
    }
  });
}
