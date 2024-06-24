import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import ProfileModel from "../models/ProfileModel.js";

export const signin = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userProfile = await ProfileModel.findOne({
      userId: existingUser._id,
    });

    res.status(200).json({ result: existingUser, userProfile });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};




export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, bio } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    const userProfile = await ProfileModel.findOne({
      userId: existingUser?._id,
    });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      bio,
    });


    res.status(200).json({ result, userProfile });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};




// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
// import ProfileModel from "../models/ProfileModel.js";

// const secret = "test";

// export const signin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.status(404).json({ message: "User doesn't exist" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const userProfile = await ProfileModel.findOne({
//       userId: existingUser._id,
//     });

//     const token = jwt.sign(
//       { email: existingUser.email, id: existingUser._id },
//       secret,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ result: existingUser, userProfile, token });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const signup = async (req, res) => {
//   const { email, password, confirmPassword, firstName, lastName, bio } =
//     req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     if (password !== confirmPassword)
//       return res.status(400).json({ message: "Passwords don't match" });

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const result = await User.create({
//       email,
//       password: hashedPassword,
//       name: `${firstName} ${lastName}`,
//     });

//     await ProfileModel.create({
//       userId: result._id,
//       bio,
//     });

//     const token = jwt.sign({ email: result.email, id: result._id }, secret, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ result, token });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
