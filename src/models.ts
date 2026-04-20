import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export const Enquiry = mongoose.model("Enquiry", enquirySchema);

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Admin = mongoose.model("Admin", adminSchema);

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  category: { type: String, required: true, enum: ['tailoring', 'aari', 'training'] },
  title: { type: String },
}, { timestamps: true });

export const Gallery = mongoose.model("Gallery", gallerySchema);
