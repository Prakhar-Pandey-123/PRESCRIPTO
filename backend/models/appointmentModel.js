import mongoose from "mongoose"

const appointmentSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    docId:{type:String,required:true},
    slotDate:{type:String,required:true},
    slotTime:{type:String,required:true},
    userData:{type:Object,require:true},
    docData:{type:Object,required:true},
    amount:{type:Number,required:true},
    date:{type:Number,required:true},
    cancelled:{type:Boolean,default:false},
    payment:{type:Boolean,default:false},
    isCompleted:{type:Boolean,default:false}
})

const appointmentModel=mongoose.model('appointment',appointmentSchema);
//appointment= name of the model you’re giving.
// Mongoose will automatically create a collection named “appointments” in MongoDB (by converting it to lowercase and plural form).

//appointmentModel= model object used in code to perform CRUD operations on that collection

export default appointmentModel