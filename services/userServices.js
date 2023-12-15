// this is a new trend followed by companies ,that put all the 3rd party call in services folder
//here we are doing same that this funtion can be called anywhere 
exports.getExpences=(req,where)=>{ //if we want to find specific expence we can pass where condition
 return req.user.getExpences(where)
}