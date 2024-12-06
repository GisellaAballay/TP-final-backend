import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}); 

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export const findUserByUsername = async (username) => {
  return User.findOne({ username });
};
export const findUserById = async (id) => {
  return User.findById(id);
};

export const createUser = async ({ username, password }) => {
  const newUser = new User({ username, password });
  await newUser.save();
  return newUser;
};
 
export default User;
