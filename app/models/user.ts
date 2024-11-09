import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'merchant'], default: 'user' },
  verified: { type: Boolean, default: false },
  avatar: { type: Object },
  provider: { type: String, default: "credentials" },
});

// ... resto del código del modelo

const UserModel = models.User || model("User", userSchema);

async function createNewUser(data: any) {
  try {
    const newUser = new UserModel(data);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { createNewUser };
export default UserModel;