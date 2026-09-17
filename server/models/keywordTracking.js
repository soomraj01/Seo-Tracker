import mongoose from "mongoose";

const rankEntrySchema = new mongoose.Schema({
    data : {
        type : Date,
        required : true
    },
    position : {
        type : Number,
        default : null
    },
     page : {
        type : Number,
        default : null
    },
     title : {
        type : String,
        default : ""
    },
     snippet : {
        type : String,
        default : ""
    }
}, {_id:false})



const competitorSchema = new mongoose.Schema({
     position : {
        type :Number,
        required : true
    },
     url : {
        type : String,
        required : true
    },
     domain : {
        type : String,
        required : null
    },
    title : {
        type : String,
        default : ""
    },
    snpiiet : {
        type : String,
        default : ""
    },

}, {_id: false})

const keywordTrackingSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    keyword : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },
    url : {
        type : String,
        required : true,
        trim : true
    },
    domain : {
        type : String,
        required : true
    },
    currentPosition : {
        type : Number,
        default : null
    },
    bestPosition : {
        type : Number,
        default : null
    },
    positionChange : {
        type : Number,
        default : 0
    },
    rankHaistory : [rankEntrySchema],
    competitior : [competitorSchema],
    active : {
        type : Boolean,
        default : true
    },
    lastChecked : {
        type : Date,
        default : null
    },
    status : {
        type : String,
        enum : ["pending", "checking", "completed", "filled"],
        default : "pending"
    },

}, {timestamps : true})



keywordTrackingSchema.index({userId : 1, keyword : 1, domain : 1}, {unique : true});

const keywordTracking = mongoose.model("keywordTracking", keywordTrackingSchema);

export default keywordTracking;