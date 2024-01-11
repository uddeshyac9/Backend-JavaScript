import mongoose from "mongoose";

const OrderItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required:true,
    }
})

const ordersSchema = new mongoose.Schema({
orderPrice: {
    type:Number,
    required:true
}, customer : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}, 
orderItems: [{OrderItemsSchema}],

address: {
    type:String,
    required: true,
},
status: {
    type: String,
    enum: ["Pending","Cancelled", "Confirmed", "Shipped",  "Dilivered"],
    default: "Pending"
}


}, {timestamps:true})

export const Orders = mongoose.model("Orders", ordersSchema);