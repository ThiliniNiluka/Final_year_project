import User from "../models/User.js";
import bcrypt from 'bcrypt';

const registerUser = async(req, res) => {
 try {
    const {email, name, password} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({ message: "Verification email sent to your email. Please check and verify your account." });

} catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
}
};

const loginUser = async(req, res) => {
  try {
} catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
}
};

export {registerUser, loginUser};