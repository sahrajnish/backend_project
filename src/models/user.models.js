import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String, // encryption of password must be done.
            required: [true, "Password is required."]
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

// Middleware: Hash password before saving to the database
userSchema.pre("save", async function(next) {
    // Check if the password field has been modified
    if(!this.isModified("password")) return next();

    // Hash the password using bcrypt with a salt factor of 10
    /*
        The salt factor in bcrypt.hash(password, saltRounds) is the number of times the hashing 
        algorithm runs to generate a stronger hash. A higher salt factor makes the hash more 
        secure but also increases processing time.
    */
    this.password = await bcrypt.hash(this.password, 10);

    // Move to the next middleware
    next();
})

// Method: Compare entered password with stored hashed password
userSchema.methods.isPasswordCorrect = async function(password) {
    // Compare the input password with the stored hashed password
    return await bcrypt.compare(password, this.password);
}

// Method to generate an Access Token for authentication
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id, // User ID
            email: this.email, // User Email
            username: this.username, // Username
            fullName: this.fullName // Full Name
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Token expiration time
        }
    )
}

// Method to generate a Refresh Token for renewing Access Tokens
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id // Only User ID is stored in Refresh Token
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key for signing refresh token
        {
            expiresIn: REFRESH_TOKEN_EXPIRY // Refresh token expiration time
        }
    )
}

export const User = mongoose.model("User", userSchema);