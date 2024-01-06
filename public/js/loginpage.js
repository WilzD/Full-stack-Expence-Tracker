const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

//for msg printing
const loginError=document.getElementById('error')
const signUpError=document.getElementById('signup-error')
const forgotPasswordError = document.getElementById('forgot-msg')

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
      let data = await axios.post('http://localhost:3000/user-login', obj)
      // ************storing token to local storage*/
      localStorage.setItem('token',data.data.token)
      window.location.href = `/index`;
      localStorage.setItem('rowsPerPage',2)
  }
  catch (error) {
      loginError.innerHTML = `<span>${error.response.data.message}!!!</span>`
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
      
      signUpError.innerHTML = `<span>${obj.name} you are in !!! redirecting you to login page</span>`
      signUpError.style.color='green'
      setTimeout(() => {
          signUpError.innerHTML = ``
          window.location.href = "/";
      }, 2000)
  } catch (error) {
    signUpError.innerHTML = `<span>${error.response.data.message}!!!</span>`
    signUpError.style.color='red'
    setTimeout(() => {
      signUpError.innerHTML = ''
    }, 2000)

  }
}

async function forgotPassword(event) {
  event.preventDefault()
  try {
      const email = document.getElementById('email').value
      const obj = {
           email
      }
      const data = await axios.post(`http://localhost:3000/password/forgotpassword`, obj)
      forgotPasswordError.innerHTML = `<span>${data.data.message}</span>`
      setTimeout(() => {
          forgotPasswordError.innerHTML = ''
          window.location.href = "/";
      }, 2000)

  } catch (error) {
    forgotPasswordError.style.color='red'
    forgotPasswordError.innerHTML = `<span>${error.response.data.message}!!!</span>`
      setTimeout(() => {
        forgotPasswordError.innerHTML =''
      }, 2000)
  }
}


function logout(event) {
  event.preventDefault();
  localStorage.removeItem('token')
  window.location.href = "/";
}
