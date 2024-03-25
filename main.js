const container = document.getElementById('container')
const registerBtn = document.getElementById('register')
const loginBtn = document.getElementById('login')

registerBtn.addEventListener('click', ()=>{
    container.classList.add('active')
})

loginBtn.addEventListener('click', ()=>{
    container.classList.remove('active')
})

const loginApi = "https://api.storerestapi.com/auth/login";
const email = document.getElementById("loginEmail")
const password = document.getElementById("loginPassword")
const buttonlogin = document.getElementById("buttonlogin")

function login(){
  fetch(loginApi, {
    method: "POST",
    body: JSON.stringify({
      email: email.value.trim(),
      password: password.value.trim(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.status == 200) {
        localStorage.access_token = res.data.access_token;
        alert("Đăng nhập thành công");
        console.log(res);
        updateButtonUI(true);
      }
      else if(email.value === ""|| password.value === ""){
        alert("Không được để trống");
        console.log(res);
      }
      else{
        alert("Đăng nhập thất bại");
        console.log(res)
      }
    })
    .catch((err) => {
      alert("Đăng nhập thất bại");
      console.log(err);
    })
    .finally(() => {
      render();
    });
}

function logout() {
  localStorage.removeItem('access_token');
  updateButtonUI(false);
  alert("Đăng xuất thành công");
}

function updateButtonUI(x) {
  if (x === true) {
    buttonlogin.innerText = "Log Out";
    buttonlogin.onclick = logout;
  } else {
    buttonlogin.innerText = "Sign In";
    email.value = "";
    password.value = "";
    buttonlogin.onclick = login;
  }
}

function checkLoggedIn() {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    updateButtonUI(true);
  } else {
    updateButtonUI(false);
  }
}
checkLoggedIn();

const registerApi = "https://api.storerestapi.com/auth/register"
const registerName =  document.getElementById("registerName")
const registerEmail = document.getElementById("registerEmail")
const registerPassword = document.getElementById("registerPassword")
const registerPhone = document.getElementById("registerPhone")
const registerPasswordrepeat = document.getElementById("registerPasswordrepeat")

function register(){
  fetch(registerApi, {
    method: "POST",
    body: JSON.stringify({
      name: registerName.value.trim(),
      email: registerEmail.value.trim(),
      number: registerPhone.value.trim(),
      password: registerPassword.value.trim(),
      password_repeat: registerPasswordrepeat.value.trim()
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.status == 201) {
        if(registerPasswordrepeat.value === registerPassword.value){
          alert("Đăng ký thành công");
          console.log(res);
          registerName.value = ""
          registerEmail.value = ""
          registerPassword.value = ""
          registerPasswordrepeat.value = ""
          registerPhone.value = ""
        }else{
          alert("Mật khẩu không trùng khớp");
          console.log(res);
        }
      }
      else if(registerName.value === "" || registerEmail.value === ""|| registerPassword.value === "" || registerPasswordrepeat.value === "" || registerPhone.value === ""){
        alert("Không được để trống");
        console.log(res);
      }
      else{
        alert("Đăng ký thất bại");
        console.log(res)
      }
    })
    .catch((err) => {
      alert("Đăng ký thất bại");
      console.log(err);
    })
    .finally(() => {
      render();
    });
}
