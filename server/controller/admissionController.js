import Admission from "../models/Admission.js";

const submitAdmission = async (req, res) => {
    try {
        const {
            student_name,
            student_phone,
            state,
            city,
            student_email,
            course,
        } = req.body;

        if (
            !student_name ||
            !student_phone ||
            !state ||
            !city ||
            !student_email ||
            !course
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await Admission.findOne({ student_email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Student already registered with this email",
            });
        }

        const admission = await Admission.create({
            student_name,
            student_phone,
            state,
            city,
            student_email,
            course,
        });

        res.status(201).json({
            success: true,
            message: "Admission submitted successfully",
            data: admission,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

export default submitAdmission;