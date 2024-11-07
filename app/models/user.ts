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

export default UserModel;