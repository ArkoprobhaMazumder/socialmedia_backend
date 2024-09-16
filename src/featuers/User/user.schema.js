import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [15, "Name max 15 characters"]
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\../, 'Please Give a Valid Email']
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: "Password must 8 characters and have a special character",
        }
    },
    posts: [
        {
            postId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
            postTime: String
        }
    ],
    friends: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            time: String,
        }
    ],
    friendRequests: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            time: String,
        }
    ]
});

userSchema.pre('save', async function (next) {
    // check if password is present and is modified.
    try {
        if (this.password && this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    } catch (err) {
        next(err);
    }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;