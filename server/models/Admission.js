import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
    {
    student_name: {
      type: String,
      required: true,
    },
    student_phone: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    student_email: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admission", admissionSchema);