import bcrypt from "bcrypt";
import User from "./models/User.js";
import connectionDb from "./db/connection.js";

const register = async () => {
  try {
    connectionDb();
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "admin",
      email: "admin@admin.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.log(error);
  }
};
register();
