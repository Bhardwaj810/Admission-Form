import Contact from "../models/Contact.js";

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const payload = {
      name: name?.trim(),
      email: email?.trim().toLowerCase(),
      phone: phone?.toString().trim(),
      subject: subject?.trim(),
      message: message?.trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.subject ||
      !payload.message
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!/^\d{10}$/.test(payload.phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    const contact = await Contact.create(payload);

    return res.status(201).json({
      success: true,
      message: "Contact request submitted successfully",
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export default submitContact;
