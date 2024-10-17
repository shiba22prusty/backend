import {asyncHandler} from "../utils/asynchandler.js"
import { ApiError } from "../utils/Apierror.js";
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res)=>{
   //  get user details from frontend
   // validation - not empty
   // check if user already exists : username, email
   // check for images, check for avtar
   // upload them to cloudnary : check avtar in cloudnary
   // create user object - create entry in db
   // remove passsword and refresh token field from response
   // check for user creation
   // return response 

   const {fullname,email, username, password}=req.body
    console.log("email",email);

    if(
        [fullname, email, username, password].some(()=> field.trim()==="")
    ){
        throw new ApiError("400", "All field are required")
    }

    const existedUser = User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avtar files is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avtar files is required")
    }

   const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while resitring the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user resisted successifully")
    )
    
})

export {registerUser,}