import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  first_name: {type: String, required:true},
  last_name: {type: String, required:true},
  email: {type: String, reuired:true, unique: true},
  password: {type:String, required:true},
  verifyOtp: {type:String, default: ''},
  verifyOtpExpireAt: {type: Number, default: 0},
  isAccountVerified: {type: Boolean, default: false},
})

const CustomerModel = mongoose.models.user || mongoose.model('Customer', CustomerSchema);

export default CustomerModel;