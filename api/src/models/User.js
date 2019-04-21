import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import * as validator from "validator";
const Isemail = require("isemail");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: {
            validator: function (email) {
                return Isemail.validate(email);
            },
            message: "Not a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
        type: String,
        validate: {
            validator: function(role) {
                const enumType = ["CUSTOMER", "PROVIDER", "ADMIN","DRIVER"];
                const valid = enumType.filter(value => value === role);
                return valid.length === 1;
            },
            message: "Not a valid role"
        },
        required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { timestamps: true });

UserSchema.pre("save", function(next) {
    if (!this.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;