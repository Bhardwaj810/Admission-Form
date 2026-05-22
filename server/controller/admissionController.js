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

        const payload = {
            student_name: student_name?.trim(),
            student_phone: student_phone?.toString().trim(),
            state: state?.trim(),
            city: city?.trim(),
            student_email: student_email?.trim().toLowerCase(),
            course: course?.trim(),
        };

        if (
            !payload.student_name ||
            !payload.student_phone ||
            !payload.state ||
            !payload.city ||
            !payload.student_email ||
            !payload.course
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!/^\d{10}$/.test(payload.student_phone)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be exactly 10 digits",
            });
        }

        const existingUser = await Admission.findOne({ student_email: payload.student_email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Student already registered with this email",
            });
        }

        const admission = await Admission.create(payload);

        res.status(201).json({
            success: true,
            message: "Admission submitted successfully",
            data: admission,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Student already registered with this email",
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

export default submitAdmission;
