const usernameEle = document.getElementById("username");
const emailEle = document.getElementById("email");
const password1Ele = document.getElementById("password1");
const password2Ele = document.getElementById("password2");
const submitBtn = document.getElementById("submit");

// show validation messages when user clicks on input
usernameEle.onfocus = function () {
  document.getElementById("username-validation-messages").style.display =
    "block";
};

emailEle.onfocus = function () {
  document.getElementById("email-validation-messages").style.display = "block";
};

password1Ele.onfocus = function () {
  document.getElementById("password1-validation-messages").style.display =
    "block";
};

password2Ele.onfocus = function () {
  document.getElementById("password2-validation-messages").style.display =
    "block";
};

// hide validation when not in focus
usernameEle.onblur = function () {
  document.getElementById("username-validation-messages").style.display =
    "none";
};

emailEle.onblur = function () {
  document.getElementById("email-validation-messages").style.display = "none";
};

password1Ele.onblur = function () {
  document.getElementById("password1-validation-messages").style.display =
    "none";
};

password2Ele.onblur = function () {
  document.getElementById("password2-validation-messages").style.display =
    "none";
};

const eleClassToggle = (condition, ele) => {
  if (condition) {
    ele.classList.remove("invalid");
    ele.classList.add("valid");
  } else {
    ele.classList.remove("valid");
    ele.classList.add("invalid");
  }
  return condition;
};

const usernameValidator = () => {
  const alphanumericEle = document.getElementById("username-alphanumeric");
  const startsendsstringEle = document.getElementById(
    "username-startsendsstring"
  );
  const lengthEle = document.getElementById("username-length");

  // check if it is alpahnumeric only
  const alphanumericPattern = /^[A-Za-z0-9]+$/;
  const a = eleClassToggle(
    usernameEle.value.match(alphanumericPattern),
    alphanumericEle
  );

  //   check if starts or ends with letters only
  const startsEndsWithLetterPattern = /^[a-zA-z](.*\w)+[a-zA-z]$/;
  const b = eleClassToggle(
    usernameEle.value.match(startsEndsWithLetterPattern),
    startsendsstringEle
  );

  //   checklength
  const lengthPattern = /^([a-zA-Z0-9_-]){5,15}$/;
  const c = eleClassToggle(usernameEle.value.match(lengthPattern), lengthEle);

  return a && b && c;
};

const emailValidator = () => {
  const formatEle = document.getElementById("email-format");
  // check to see if email match @{domain name}.{domain}
  const formatPattern =
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+[.][A-za-z0-9.-]+$/gm;
  const a = eleClassToggle(emailEle.value.match(formatPattern), formatEle);

  return a;
};

const password1Validator = () => {
  const lengthEle = document.getElementById("password1-length");
  // check length of password
  const lengthPattern = /^([a-zA-Z0-9_-~!@$%&]){8,}$/;
  const a = eleClassToggle(password1Ele.value.match(lengthPattern), lengthEle);
  document.getElementById("password2-validation-messages").style.display =
    "none";

  return a;
};

const password2Validator = () => {
  const valueEle = document.getElementById("password2-value");
  // check  1f password1 === password2
  const a = eleClassToggle(password1Ele.value === password2Ele.value, valueEle);

  return a;
};

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  // validate form on submit
  const a = usernameValidator();
  const b = emailValidator();
  const c = password1Validator();
  const d = password2Validator();

  // display validation messages
  if (!a) {
    document.getElementById("username-validation-messages").style.display =
      "block";
  }
  if (!b) {
    document.getElementById("email-validation-messages").style.display =
      "block";
  }
  if (!c) {
    document.getElementById("password1-validation-messages").style.display =
      "block";
  }
  if (!d) {
    document.getElementById("password2-validation-messages").style.display =
      "block";
  }

  if (!a || !b || !c || !d) {
    return;
  }

  const data = postData({
    username: usernameEle.value,
    email: emailEle.value,
    password: password1Ele.value,
    password_confirmation: password2Ele.value,
  });
});

const postData = async (data) => {
  const res = await fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  });

  if (res.status === 200) {
    window.localStorage.setItem("userEmail", data.email);
    window.location.href = "./loginSuccess.html";
  } else {
    console.log("failed");
    console.log(res.status);
    console.log(res.json());
    return null;
  }
};
