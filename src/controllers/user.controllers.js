import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // get details from req.body coming from frontend
    const { fullName, username, email, password } = req.body
    console.log(req.body);

    // check if any detail is empty or not.
    if(
        [fullName, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists with same email or username. 
    const userExisted = await User.findOne({
        $or: [{username}, {email}]
    })
    if(userExisted) {
        throw new ApiError(409, "User with email or username already exists.")
    }
    // console.log(userExisted);

    // upload avatar to backend server and check for avatar file uploaded on backend server.
    const avatarLocalPath = req.files?.avatar[0]?.path
    let coverImageLocalPath;
    if(Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    console.log(coverImageLocalPath);

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // upload avatar file to cloudinary and check if it is uploaded or not.
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar) {
        throw new ApiError(500, "Something went wrong while uploading avatar file")
    }

    // create user in database
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    })

    // check if user entry is successful or not.
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" // this field will be removed will returning the user data if existed.
    )
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user.")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully.")
    )
} )

export { registerUser };