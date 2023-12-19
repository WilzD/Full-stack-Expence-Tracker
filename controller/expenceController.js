//including models so we can use the Model data
const Expence = require('../models/expence')
const User=require('../models/user')
const sequelize = require('../path/database')
//using return statement because we are sending a promise to the api user

//getting all expences
exports.getExpences = async (req, res) => {
    const page=+req.query.page
    const ITEMS_PER_PAGE=+req.query.rowlist
    console.log(page,ITEMS_PER_PAGE)

    //using magic function ti=o get data of that perticular user
    const totalRows=await req.user.getExpences()
    console.log(totalRows.length)
     const expences=await req.user.getExpences({
        offset:(page-1)*ITEMS_PER_PAGE,
        limit:ITEMS_PER_PAGE
     })// this will give us data of that perticular user only
     console.log(expences.length)
     const ispremiumuser=req.user.ispremiumuser //to check user is premium or not
     const totalexpence=req.user.totalexpence
     return res.status(200).json({
        expences:expences,ispremiumuser:ispremiumuser,totalexpence:totalexpence,
        currentPage:page,
        hasNextPage:ITEMS_PER_PAGE*page<totalRows.length,
        nextPage:page+1,
        hasPreviousPage:page>1,
        previousPage:page-1,
        lastPage:Math.ceil(totalRows.length/ITEMS_PER_PAGE)
    })
}

//adding a expence
exports.postExpence = async (req, res) => {
    try {
        let transaction=await sequelize.transaction() // if update fails then the expence will not be stored,always use transaction for all request(other then get)
        // console.log(req.user)
        const price = req.body.Expence
        const category = req.body.Cateagory
        const description = req.body.Desc
        const data = await req.user.createExpence({ price: price, category: category, description: description,transaction}) //using magic function to add expence
        const user=await User.findByPk(req.user.id)
        const totalexpence=user.totalexpence+ +price
        // const totalexpence = await Expence.sum('price', { where: { UserId: req.user.id }},{transaction});
        await req.user.update({totalexpence:totalexpence},{transaction})
        await transaction.commit()
        return res.status(200).json({ data: data }) 
    } catch (error) {
        console.log(error)
        await transaction.rollback() //if problem occurs it will not add that expence and rollback
        return res.status(404).json({message:'problem .adding expence'})
    }

}

//delete an expence
exports.deleteExpence = async (req, res) => {
    let transaction;
    try {
        transaction=await sequelize.transaction()
        const prodId=req.params.id
        const expence=await Expence.findByPk(prodId)
        const totalexpence = await Expence.sum('price', { where: { UserId: req.user.id }},{transaction});
        await req.user.update({totalexpence:totalexpence-expence.price},{transaction})
        await Expence.destroy({where:{id:prodId}},{transaction})
        await transaction.commit()
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        await transaction.rollback()
        return res.status(404).json({message:'problem .deleting expence'})
    }

}

//getting specific id data
exports.editExpence = async (req, res) => {
    const data = await Expence.findByPk(req.params.id)
    return res.status(200).json(data)
}

//updating the data
exports.updateExpence = async (req, res) => {
    console.log(req.params.id)
    const updatedPrice = req.body.Expence
    const updatedCategory = req.body.Cateagory
    const updatedDesc = req.body.Desc

    const updatedUser = await Expence.findByPk(req.params.id)
        updatedUser.price = updatedPrice,
        updatedUser.category = updatedCategory,
        updatedUser.description = updatedDesc,
        updatedUser.save()
    return res.sendStatus(200)
}