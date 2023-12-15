
const token=localStorage.getItem('token')
async function Showdata() {
    try {
        const response = await axios.get(`http://localhost:3000/expences`,{headers:{'Authorization':token}})//passing token so that specific user's data will be shown
        console.log(response)
        let isPreminum=response.data.ispremiumuser
                if(isPreminum==true){
                    document.getElementById('ispremium').style.display='block'
                    document.getElementById('leaderboard').style.display='block'
                    document.getElementById('downloaadExpence').style.display='block'
                    document.getElementById('downloaadHistory').style.display='block'
                }
                else{
                    document.getElementById('rzp-button1').style.display='block'
                }
        //generate some id                                                                                 // passing in headers so that it will not seen in url
        let idCode = "ET"
        let idNum = 202300
        let html = ''
        response.data.expences.forEach((element, index) => {
            html += "<tr>"
            html += `<td>${idCode}${++idNum}</td>`
            html += `<td>${element.price}</td>`
            html += `<td>${element.category}</td>`
            html += `<td>${element.description}</td>`
            // console.log(`${element._id}`)
            html += `<td><button onclick="EditExpence('${element.id}')" class="btn btn-warning"> Edit </button></td>`
            html += `<td><button onclick=DeleteExpence('${element.id}') class="btn btn-danger"> X </button></td>`
            html += "</tr>"
        });
        document.querySelector('#crudTable tbody').innerHTML = html
    } catch (error) {
        console.log(error)
    }
}
// load date when refresh
document.onload = Showdata()


function AddExpence() {
    let btn = document.getElementById('AddBtn')
    btn.addEventListener('click', async function Add() {
        try {
            let Expence = document.querySelector('#Price').value
            let Cateagory = document.querySelector('select').value
            let Desc = document.querySelector('#desc').value

            const obj = {
                Expence,
                Cateagory,
                Desc
            }
            await axios.post('http://localhost:3000/add-expence',obj,{headers:{'Authorization':token}})
            document.querySelector('#Price').value = ""
            document.querySelector('#desc').value = ""
            Showdata()

        } catch (error) {
            console.log(error)
        }
    })
}
AddExpence()

async function EditExpence(id) {
    try {
        //add bitton will hide and update button display
        document.getElementById('UpdateBtn').style.display = 'block'
        document.getElementById('AddBtn').style.display = 'none'
        const response = await axios.get(`http://localhost:3000/edit-expence/${id}`,{headers:{'Authorization':token}})
        console.log(response)
        document.querySelector('#Price').value = response.data.price
        document.querySelector('select').value = response.data.category
        document.querySelector('#desc').value = response.data.description
    } catch (error) {
        console.log(error)
    }
    try {
        //here we are using put method because patch method is showing error , and our web is working very fine with put method
        document.getElementById('UpdateBtn').onclick = async () => {
            await axios.put(`http://localhost:3000/update-expence/${id}`, {
                Expence: document.querySelector('#Price').value,
                Cateagory: document.querySelector('select').value,
                Desc: document.querySelector('#desc').value
            },{headers:{'Authorization':token}})
            Showdata()
            //add bitton will hide and update button display
            document.querySelector('#Price').value = ''
            document.querySelector('#desc').value = ''
            document.getElementById('UpdateBtn').style.display = 'none'
            document.getElementById('AddBtn').style.display = 'block'

        }

    } catch (error) {
        console.log(error)
    }
}



async function DeleteExpence(id) {
    try {
        await axios.delete(`http://localhost:3000/delete/${id}`,{headers:{'Authorization':token}})
        Showdata()
    } catch (error) {
        console.log(error)
    }
}

async function addUser() {

    try {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        let obj = {
            name: name,
            email: email,
            password: password
        }
        const data = await axios.post('http://localhost:3000/user', obj)
        console.log(data)
        let msg = document.getElementById('msg')
        msg.innerHTML = `<h2>${data.data.message}</h2>`
        setTimeout(() => {
            window.location.href = "login.html";
            msg.innerHTML = ''
        }, 2000)
    } catch (error) {
        console.log(error)
        let msg = document.getElementById('msg')
        console.log(error)
        msg.innerHTML = `<h2>${error.response.data.message}</h2>`
        setTimeout(() => {
            msg.innerHTML = ''
        }, 2000)

    }
}

async function loginUser() {
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
        let msg = document.getElementById('msg')
        msg.innerHTML = `<h2>${data.data.message}</h2>`
        setTimeout(() => {
            msg.innerHTML = ''
            window.location.href = 'index.html'
        }, 2000)
    }
    catch (error) {
        console.log(error)
        // console.log(error.response.data.message)
        // let msg = document.getElementById('msg')
        // msg.innerHTML = `<h2>${error.response.data.message}</h2>`
        // setTimeout(() => {
        //     msg.innerHTML = ''
        // }, 2000)
    }


}

async function premiummembership(){
    console.log(token)
    const response=await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{'Authorization':token}})
    console.log(response)
    var options = {
     "key":response.data.key_id,
     "order_id":response.data.order.id,
        "description": "Mufil Rahman Test",
        "handler": async function (response) {
             await axios.post("http://localhost:3000/purchase/updatepremiummembership", {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id
            },{headers:{'Authorization':token}});
            alert('you are premium member now');
        },
    }
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        console.log(response);
        alert('Something went wrong Transaction failed');

    });
    document.getElementById('rzp-button1').onclick = function (e) {
        rzp1.open();
        e.preventDefault();
    }
}
premiummembership()


async function showLeaderboard(){
    const leaderboard=await axios.get('http://localhost:3000/purchase/premiumuser/leaderboard')
    let html = ''
    leaderboard.data.forEach((element) => {
        html += "<tr>"
        html += `<td>${element.name}</td>`
        html += `<td>${element.totalexpence}</td>`
        html += "</tr>"
    });
    document.querySelector('#leaderTable tbody').innerHTML = html
}

async function forgotPassword(){
    try {
        const name=document.getElementById('name').value
        const email=document.getElementById('email').value
        const contact=document.getElementById('contact').value
        const obj={
            name,email,contact
        }
        const data=await axios.post('http://localhost:3000/password/forgotpassword',obj) 
        let msg = document.getElementById('msg')
        msg.innerHTML = `<h2>${data.data.message}</h2>`
        setTimeout(() => {
            window.location.href = "login.html";
            msg.innerHTML = ''
        }, 2000)
    } catch (error) {
        console.log(error)
        let msg = document.getElementById('msg')
        console.log(error)
        msg.innerHTML = `<h2>${error}</h2>`
        setTimeout(() => {
            msg.innerHTML = ''
        }, 2000)
    }


}

async function downloadExpence(){
    try {
        const response=await axios.get(`http://localhost:3000/expences/download`,{headers:{'Authorization':token}})
        // console.log(response)
        var a=document.createElement('a')
        a.href=response.data.fileURL
        a.download='myexpence.csv'
        a.click(); 

        msg.innerHTML = `<h2>Download succesfull</h2>`
        setTimeout(() => {
            msg.innerHTML = ''
        }, 2000)

    } catch (error) {
        let msg = document.getElementById('msg')
        msg.innerHTML = `<h2>${error.response.data.message}</h2>`
        setTimeout(() => {
            msg.innerHTML = ''
        }, 2000)
        console.log(error.response.data.message)
    }

    
}

async function downloadHistory(){
        const downloadhistory=await axios.get(`http://localhost:3000/expences/download-history`,{headers:{'Authorization':token}})
        downloadhistory.data.downloadHistory.forEach((element, index) => {
            html += "<tr>"
            html += `<td><a href="${element.url}">download</a></td>`
            html += "</tr>"
        });
        document.querySelector('#historyTable tbody').innerHTML = html
        console.log(downloadhistory.data.downloadHistory)
     }

