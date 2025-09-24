const { default: mongoose } = require("mongoose");
require("./Product");
require("./User");

const schema= mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },    
},{
    timestamps:true
})
const WishlistModle=mongoose.models.WishList||mongoose.model("Wishlist",schema)
export default WishlistModle