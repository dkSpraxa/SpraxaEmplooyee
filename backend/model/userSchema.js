const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true
    },
    profile:{
        type:String,
        default:"profiles.png"
    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone number"],
        minLength:10,
        maxLength:12
    },
    department:{
        type:String,
        required:[true,"Please select your department"],
        enum:['Developement','Testing','HR']
    },
    role:{
        type:String,
        default:"user"
    },
    address:{
        type:String,
        required:[true,"Please provide your address"]
    },
    password:{
        type:String,
        required:[true,"Please provide your name"],
        minLength:[8,"Password shold be at least 8 characters"]
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password)
}

userSchema.methods.genrateToken = async function(){
    return jwt.sign({id:this._id},process.env.TOKEN_SECRETE_KEY,{expiresIn:process.env.TOKEN_EXPIRE_TIME})
}
module.exports = mongoose.model("users",userSchema)