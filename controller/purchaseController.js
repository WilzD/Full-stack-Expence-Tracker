const Razorpay=require('razorpay')
const Order=require('../models/order')

exports.premiumMembership=async(req,res)=>{ 
    try {
        var rzp= new Razorpay({
            key_id:'rzp_test_NQ844u72fokPMf',
            key_secret:'UNYqHxMhpNDm3W0gQMjoMmgf'
         })
         const amount=9900
         rzp.orders.create({amount,currency:"INR"},async (err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err))
            }
            // console.log(order)
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

    // console.log(req.body)
    // try {
    //     const {payment_id,order_id}=req.body
    //     const order=await Order.findOne({where:{orderId:order_id}})
    //     await order.update({paymentId:payment_id,status:'SUCCESSFUL'})
    //     await req.user.update({ispremiumuser:true})
    //     res.status(202).json({message:'transaction Done'})
    // } catch (error) {
    //     return res.status(404).json('Transaction Failed')
    // }
}