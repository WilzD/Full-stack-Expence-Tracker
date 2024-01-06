
exports.landingPage= async(request, response, next) => {
    response.sendFile('login.html',{root:'views'});    
}

exports.indexPage= (request, response, next) => {
    response.sendFile('index.html',{root:'views'}); 
}
exports.forgotPassword= (request, response, next) => {
    response.sendFile('forgotPassword.html',{root:'views'});
}