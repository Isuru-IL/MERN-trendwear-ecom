// const product = require("../model/Product")
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const {sign} = require("jsonwebtoken");
dotenv.config();

const AuthController = {

    // register: async function (req, res, next) {
    //
    //     try {
    //         const { email, password,role } = req.body;
    //
    //         const hashedPassword = await bcrypt.hash(password, 10);
    //         const user = new User({ email, password: hashedPassword,role });
    //         await user.save();
    //
    //         const token = sign({ userEmail: email }, process.env.JWT_KEY, {
    //             expiresIn: '1h',
    //         });
    //
    //         res.status(201).json({
    //             message: 'Account created successfully! You are now logged in.',
    //             token: token
    //         });
    //     } catch (error) {
    //         res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
    //     }
    // },

    register: async function (req, res, next) {
        try {
            const { email, password, role } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(401).json({
                    message: 'Email is already registered. Please use a different email.'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ email, password: hashedPassword, role });
            await user.save();

            const token = sign({ userEmail: email }, process.env.JWT_KEY, {
                expiresIn: '1h',
            });

            res.status(201).json({
                message: 'Account created successfully! You are now logged in.',
                token: token
            });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
        }
    },


    login: async function login(req,res){
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'No account found associated with this email address. Please check and try again.' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials. Please check your username and password and try again.' });
            }
            const token = sign({ userEmail: email }, process.env.JWT_KEY, {
                expiresIn: '5h',
            });

            res.status(200).json({
                message: 'Login successful! Welcome back.',
                token: token
            });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred during login. Please try again later.' });
        }
    }


}

module.exports = AuthController