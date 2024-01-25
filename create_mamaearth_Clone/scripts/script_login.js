let form = document.getElementById("login_Form");
let email = document.getElementById("email");
let password = document.getElementById("password");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let userDetails = {
    email: email.value,
    password: password.value,
  };
  let saveDetails = JSON.parse(localStorage.getItem("userDetails"));
  if (
    userDetails.email === saveDetails.email &&
    userDetails.password === saveDetails.password
  ) {
    localStorage.setItem("isAuth", "Authenticated");
    alert("Login success! ");
  } else {
    alert("Wrong credentials");
  }
  console.log(userDetails);
});
