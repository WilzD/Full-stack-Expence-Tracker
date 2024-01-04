const Razorpay=require('razorpay')
const Order=require('../models/order')

exports.premiumMembership=async(req,res)=>{ 
    try {
        var rzp= new Razorpay({
            key_id:process.env.RZP_KEY_ID ,
            key_secret:process.env.RZP_KEY_SECRET ,
         })
         const amount=9900
         rzp.orders.create({amount,currency:"INR"},async (err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err))
            }
            await req.user.createOrder({orderId:order.id,status:'PENDING'})
            return res.status(201).json({order,key_id:rzp.key_id})
         })
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:'something went wrong'})
    }

}

exports.updateTrasactionStatus=async(req,res)=>{

    const { order_id, payment_id } = req.body;

    try {
        const user = req.user;
        user.ispremiumuser = true;
        await Promise.all([
            user.save(),
            Order.update(
                { paymentId: payment_id, status: "Successful" },
                { where: { orderId: order_id }}
            )
        ])
        res.status(202).json({ success: true, message: "Thank youfor being a premium user" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating transaction" });
    }
}