const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

// const token=localStorage.getItem('token')

signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%"; 
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});


async function loginUser(e) {
  e.preventDefault()
  try {
      const name = document.getElementById('name').value
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value

      let obj = {
          name: name,
          email: email,
          password: password
      }
      console.log(obj)
      let data = await axios.post('http://localhost:3000/user-login', obj)
      // ************storing token to local storage*/
      localStorage.setItem('token',data.data.token)
      window.location.href = "index.html";
      localStorage.setItem('rowsPerPage',2)
  }
  catch (error) {
      console.log(error)
      console.log(error.response.data.message)
      let msg = document.getElementById('error')
      msg.innerHTML = `<span>${error.response.data.message}!!!</span>`
      setTimeout(() => {
          msg.innerHTML = ''
      }, 2000)
  }


}

async function addUser(e) {
  e.preventDefault()
  
  try {
    const name = document.getElementById('s-name').value
    const email = document.getElementById('s-email').value
    const password = document.getElementById('s-password').value
      let obj = {
          name: name,
          email: email,
          password: password
      }
      const data = await axios.post('http://localhost:3000/user', obj)
      console.log(data)
      setTimeout(() => {
          window.location.href = "login.html";
      }, 2000)
  } catch (error) {
    console.log(error)
    console.log(error.response.data.message)
    let msg = document.getElementById('signup-error')
    msg.innerHTML = `<span>${error.response.data.message}!!!</span>`
    setTimeout(() => {
        msg.innerHTML = ''
    }, 2000)

  }
}

async function forgotPassword(event) {
  event.preventDefault()
  try {
      // const name = document.getElementById('name').value
      const email = document.getElementById('email').value
      // const contact = document.getElementById('contact').value
      const obj = {
           email
      }
      const data = await axios.post(`http://localhost:3000/password/forgotpassword`, obj)
     
      let msg = document.getElementById('forgot-msg')
      msg.style.color='green'
      msg.innerHTML = `<span>${data.data.message}</span>`
      setTimeout(() => {
          window.location.href = "login.html";
          msg.innerHTML = ''
          
      }, 3000)

  } catch (error) {
      console.log(error)
      let msg = document.getElementById('forgot-msg')
      msg.style.color='red'
      msg.innerHTML = `<span>${error.response.data.message}!!!</span>`
      setTimeout(() => {
        msg.innerHTML =''
      }, 2000)
  }
}

function logout(event) {
  event.preventDefault();
  localStorage.removeItem('token')
  window.location.href = "login.html";
}