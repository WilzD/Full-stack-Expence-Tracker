
const token = localStorage.getItem('token')
//as soon as the user login this will run
window.addEventListener("DOMContentLoaded", async () => {
    const page = 1
    let rowlist = localStorage.getItem('rowsPerPage')
    document.getElementById('RowsLimit').value = rowlist
    const response = await axios.get(`http://localhost:3000/expences?page=${page}&rowlist=${rowlist}`, { headers: { 'Authorization': token } })// passing in headers so that it will not seen in url
    ShowExpences(response.data.expences, response.data.ispremiumuser)
    ShowPagination(response.data.currentPage, response.data.hasNextPage, response.data.nextPage, response.data.hasPreviousPage, response.data.previousPage)
})

//after selecting one value the rows per page will change
async function setRowlistValue() {
    document.getElementById('RowsLimit').onclick = async () => {
        localStorage.setItem('rowsPerPage', document.getElementById('RowsLimit').value)
        const page = 1
        let rowlist = localStorage.getItem('rowsPerPage')
        document.getElementById('RowsLimit').value = rowlist
        const response = await axios.get(`http://localhost:3000/expences?page=${page}&rowlist=${rowlist}`, { headers: { 'Authorization': token } })// passing in headers so that it will not seen in url
        ShowExpences(response.data.expences, response.data.ispremiumuser)
        ShowPagination(response.data.currentPage, response.data.hasNextPage, response.data.nextPage, response.data.hasPreviousPage, response.data.previousPage)
    }
}
setRowlistValue()

//by this funtion we are making previous/ next buttons
function ShowPagination(currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage, lastPage) {
    //saving so that when edit that user will be on that page 
    localStorage.setItem('currentPage', currentPage)
    let pagination = document.getElementById('pagination')
    pagination.innerHTML = ''

    if (hasNextPage) {
        const btn3 = document.createElement('button')
        btn3.innerHTML = nextPage
        btn3.addEventListener('click', () => getExpences(nextPage))
        pagination.appendChild(btn3)
    }

    const btn1 = document.createElement('button')
    btn1.innerHTML = currentPage
    btn1.addEventListener('click', () => getExpences(currentPage))
    pagination.appendChild(btn1)

    if (hasPreviousPage) {
        const btn2 = document.createElement('button')
        btn2.innerHTML = previousPage
        btn2.addEventListener('click', () => getExpences(previousPage))
        pagination.appendChild(btn2)
    }
}

async function ShowExpences(expenceList, isPremium) {
    try {
        if (isPremium == true) {
            document.getElementById('ispremium').style.display = 'block'
            document.getElementById('leaderboard').style.display = 'block'
            document.getElementById('downloaadExpence-1').style.display = 'block'
            document.getElementById('downloaadExpence-2').style.display = 'block'

        }
        else {
            document.getElementById('rzp-button1').style.display = 'block'
        }
        //generate some id                                                                           
        let idCode = "ET"
        let idNum = 202300
        let html = ''
        expenceList.forEach((element) => {
            html += "<tr>"
            html += `<td>${idCode}${++idNum}</td>`
            html += `<td>${element.price}</td>`
            html += `<td>${element.category}</td>`
            html += `<td>${element.description}</td>`
            // console.log(`${element._id}`)
            html += `<td><button onclick="EditExpence('${element.id}')" class="btn btn-warning mr-2"> Edit </button></td>`
            html += `<td><button onclick=DeleteExpence('${element.id}') class="btn btn-danger"> X </button></td>`
            html += "</tr>"
        });
        document.querySelector('#tbl-content tbody').innerHTML = html
    } catch (error) {
        console.log(error)
    }
}
async function getExpences(page) {
    let rowlist = localStorage.getItem('rowsPerPage')
    const response = await axios.get(`http://localhost:3000/expences?page=${page}&rowlist=${rowlist}`, { headers: { 'Authorization': token } })// passing in headers so that it will not seen in url
    ShowExpences(response.data.expences, response.data.ispremiumuser)
    ShowPagination(response.data.currentPage, response.data.hasNextPage, response.data.nextPage, response.data.hasPreviousPage, response.data.previousPage)
}

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
            await axios.post('http://localhost:3000/add-expence', obj, { headers: { 'Authorization': token } })
            document.querySelector('#Price').value = ""
            document.querySelector('#desc').value = ""
            let page = localStorage.getItem('currentPage')
            getExpences(page)
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
        const response = await axios.get(`http://localhost:3000/edit-expence/${id}`, { headers: { 'Authorization': token } })
        console.log(response)
        document.querySelector('#Price').value = response.data.price
        document.querySelector('select').value = response.data.category
        document.querySelector('#desc').value = response.data.description
        try {

            //here we are using put method because patch method is showing error , and our web is working very fine with put method
            document.getElementById('UpdateBtn').onclick = async () => {
                // console.log( document.querySelector('#Price').value,document.querySelector('select').value,document.querySelector('#desc').value)
                await axios.put(`http://localhost:3000/update-expence/${id}`, {
                    Expence: document.querySelector('#Price').value,
                    Cateagory: document.querySelector('select').value,
                    Desc: document.querySelector('#desc').value
                }, { headers: { 'Authorization': token } })
                //add bitton will hide and update button display
                // console.log(response)

                // let  rowlist=localStorage.getItem('rowsPerPage')
                let page = localStorage.getItem('currentPage')
                getExpences(page)
                document.querySelector('#Price').value = ''
                document.querySelector('#desc').value = ''
                document.getElementById('UpdateBtn').style.display = 'none'
                document.getElementById('AddBtn').style.display = 'block'
                // const response= await axios.get(`http://localhost:3000/expences?page=${page}&rowlist=${rowlist}`,{headers:{'Authorization':token}})// passing in headers so that it will not seen in url
                // ShowExpences(response.data.expences,response.data.ispremiumuser)
                // ShowPagination(response.data.currentPage,response.data.hasNextPage,response.data.nextPage,response.data.hasPreviousPage,response.data.previousPage)
            }

        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }

}



async function DeleteExpence(id) {
    try {
        await axios.delete(`http://localhost:3000/delete/${id}`, { headers: { 'Authorization': token } })
        let page = localStorage.getItem('currentPage')
        getExpences(page)
    } catch (error) {
        console.log(error)
    }
}

async function premiummembership() {
    // console.log(token)
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { 'Authorization': token } })
    // console.log(response)
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "description": "Wilson Test",
        "handler": async function (response) {
            await axios.post("http://localhost:3000/purchase/updatepremiummembership", {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id
            }, { headers: { 'Authorization': token } });
            let msg=document.getElementById('download-msg')
            msg.style.color='white'
            msg.innerHTML = `<h5>Congratulations !!! You are a premium member now</h5>`
            setTimeout(() => {
                msg.innerHTML = ''
                getExpences(1)
            }, 2000)
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


async function showLeaderboard() {

    document.getElementById('leaderBoard').style.display = 'block'
    document.getElementById('form').style.display = 'none'
    document.getElementById('dashboard').style.display = 'none'
    document.getElementById('historySection').style.display = 'none'

    const leaderboard = await axios.get('http://localhost:3000/purchase/premiumuser/leaderboard', { headers: { 'Authorization': token } })
    // console.log(leaderboard)
    let html = ''
    let num = 0
    leaderboard.data.forEach((element) => {
        html += "<tr>"
        html += `<td>${++num}</td>`
        html += `<td>${element.name}</td>`
        html += `<td>${element.totalexpence}</td>`
        html += "</tr>"
    });
    document.querySelector('#leaderTable tbody').innerHTML = html
}


async function downloadExpence() {
    try {
        const response = await axios.get(`http://localhost:3000/expences/download`, { headers: { 'Authorization': token } })
        // console.log(response)
        var a = document.createElement('a')
        a.href = response.data.fileURL
        a.download = 'myexpence.csv'
        a.click();
     
        let msg=document.getElementById('download-msg')
        msg.style.color='white'
        msg.innerHTML = `<h5>Download succesfull</h5>`
        setTimeout(() => {
            msg.innerHTML = ''
        }, 2000)

    } catch (error) {
        let msg = document.getElementById('download-msg')
        msg.style.color='red'
        msg.innerHTML = `<h5>${error.response.data.message}</h5>`
        setTimeout(() => {
            msg.innerHTML = ''
        }, 2000)
        console.log(error.response.data.message)
    }


}

async function downloadHistory() {
    document.getElementById('historySection').style.display = 'block'
    document.getElementById('form').style.display = 'none'
    document.getElementById('dashboard').style.display = 'none'
    document.getElementById('leaderBoard').style.display = 'none'

    

    const downloadhistory = await axios.get(`http://localhost:3000/expences/download-history`, { headers: { 'Authorization': token } })
    console.log(downloadhistory)
    let html = ''
    let num = 0
    downloadhistory.data.downloadHistory.forEach((element, index) => {
        html += "<tr>"
        html += `<td>${++num}</td>`
        html += `<td>${element.createdAt}</td>`
        html += `<td><a href="${element.url}">download</a></td>`
        html += "</tr>"
    });
    document.querySelector('#historyTable tbody').innerHTML = html
    console.log(downloadhistory.data.downloadHistory)
}

