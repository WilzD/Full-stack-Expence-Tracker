//including models so we can use the Model data
const User = require('../models/expence')

//using return statement because we are sending a promise to the api user

//getting all expences
exports.getExpences = async (req, res) => {
    const expences = await User.findAll()
    return res.status(200).json(expences)
}

//adding a expence
exports.postExpence = async (req, res) => {
    const price = req.body.Expence
    const category = req.body.Cateagory
    const description = req.body.Desc
    const data = await User.create({ price: price, category: category, description: description })
    return res.status(200).json({ data: data })
}

//delete an expence
exports.deleteExpence = async (req, res) => {
    const id = req.params.id
    await User.destroy({ where: { id: id } })
    return res.sendStatus(200)

}

//getting specific id data
exports.editExpence = async (req, res) => {
    const data = await User.findByPk(req.params.id)
    return res.status(200).json(data)
}

//updating the data
exports.updateExpence = async (req, res) => {
    console.log(req.params.id)
    const updatedPrice = req.body.Expence
    const updatedCategory = req.body.Cateagory
    const updatedDesc = req.body.Desc

    const updatedUser = await User.findByPk(req.params.id)
        updatedUser.price = updatedPrice,
        updatedUser.category = updatedCategory,
        updatedUser.description = updatedDesc,
        updatedUser.save()
    return res.sendStatus(200)
}