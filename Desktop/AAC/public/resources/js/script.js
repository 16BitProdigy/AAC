/* eslint-disable no-alert */
// eslint-disable-next-line import/no-extraneous-dependencies
const axios = require("axios");

// Creating a sticky navigation
const navBar = document.querySelector(".navbar");
const sticky = navBar.offsetTop;

function stickyUp() {
  if (window.pageYOffset >= sticky) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
}
window.onscroll = stickyUp();

// Making the menu button work
const toggleButton = document.querySelector(".menu-icon");
const navMenu = document.querySelector(".navbar-links");

toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Selecting the areas of form to be sent
const contactForm = document.querySelector(".contact-form");

const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formPhone = document.getElementById("phone");
let formMessage = document.getElementById("message");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("checking");

  const formData = {
    name: formName.value,
    email: formEmail.value,
    phone: formPhone.value,
    message: formMessage.value,
  };
  try {
    const res = await axios({
      method: "POST",
      url: "/",
      data: formData,
    });
    alert("Email sent");
    console.log(res);
    formName.value = "";
    formEmail.value = "";
    formPhone.value = "";
    formMessage = "";
  } catch (err) {
    alert("Something went wrong!");
    console.log(err);
    console.log(err.response);
  }
  // const xhr = new XMLHttpRequest();

  // // eslint-disable-next-line func-names
  // xhr.onload = function () {
  //   console.log(xhr.responseText);

  //   if (xhr.responseText) {
  //     alert("Email sent");
  //     formName.value = " ";
  //     formEmail.value = " ";
  //     formPhone.value = " ";
  //     formMessage = " ";
  //   } else {
  //     alert("Something went wrong!");
  //   }
  // };
  // xhr.open("POST", "server.js", true);
  // xhr.setRequestHeader("Content-type", "application/JSON");
  // xhr.send(JSON.stringify(formData));
});
