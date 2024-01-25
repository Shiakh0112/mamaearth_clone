let form = document.getElementById("form1");
let email = document.getElementById("email");
let password = document.getElementById("password");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log("ashfaq");
  let userDetails = {
    email: email.value,
    password: password.value,
  };
  userDetails;
  let signupDetails = localStorage.setItem(
    "userDetails",
    JSON.stringify(userDetails)
  );
  email.value = "";
  password.value = "";
});
