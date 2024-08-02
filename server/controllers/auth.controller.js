import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

// Utility function to remove password from user object
const excludePassword = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};

export const Signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

export const Signin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password || username.trim() === '' || password.trim() === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ username });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = await bcryptjs.compare(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }

        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '5h' });

        const userWithoutPassword = excludePassword(validUser);

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const GoogleAuth = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET || 'default_secret_key', {expiresIn: '5h'});
            const userWithoutPassword = excludePassword(user);
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(userWithoutPassword);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
            const newUser = new User({username: name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email, password: hashedPassword, profilePicture: googlePhotoUrl});
                
            await newUser.save();
            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET || 'default_secret_key', {expiresIn: '5h'});
            const userWithoutPassword = excludePassword(newUser);
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(userWithoutPassword);
        }
    } catch (error) {
        next(error)
    }
}