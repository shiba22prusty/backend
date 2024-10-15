
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,  //cloudinary url
            required: true
        },
        thumbnail: {
            type: String,  //cloudinary url
            required: true
        },
        title: {
            type: String,  
            required: true
        },
        discription: {
            type: String, 
            required: true
        },
        duration:{
            typr:Number,
            required:true
        },
        views:{
            type: Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type: Schema.Types.Array.ObjectId,
            ref: "User"
        }
    },   
    {
        timeStamp: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)