import mongoose, { Schema, model, models, Model } from "mongoose";
import { hashSync, compareSync, genSaltSync } from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user' | 'store';
  verified: boolean;
  avatar?: { url: string };
  provider: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  storeDetails?: {
    storeName?: string;
    storeType?: 'clothing' | 'shoes' | 'other';
    description?: string;
  };
}

interface IUserMethods {
  compare(password: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['admin', 'user', 'store'], default: 'user' },
  verified: { type: Boolean, default: false },
  avatar: { type: Object },
  provider: { type: String, default: "credentials" },
  approvalStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved' 
  },
  storeDetails: {
    storeName: { type: String },
    storeType: { 
      type: String,
      enum: ['clothing', 'shoes', 'other']
    },
    description: { type: String }
  }
}, {
  timestamps: true
});

// Add password hashing middleware
userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    const salt = genSaltSync(10);
    this.password = hashSync(this.password || '', salt);
  }
  
  // Set approvalStatus based on role
  if (this.isModified('role')) {
    this.approvalStatus = this.role === 'store' ? 'pending' : 'approved';
  }
  
  next();
});

// Add password comparison method
userSchema.methods.compare = function(password: string) {
  return compareSync(password, this.password || '');
};

// Initialize the User Model
const UserModel = (models?.User || model<IUser, UserModel>("User", userSchema)) as UserModel;

async function createNewUser(data: Partial<IUser>) {
  try {
    const newUser = new UserModel(data);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  }
}

export type { IUser };
export { createNewUser };
export default UserModel;