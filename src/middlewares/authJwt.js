import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({message: "No token provided"});

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId);

        if(!user) return res.status(404).json({message: 'User not found'});
        // FAG04Y NEON MARRON
        // 5527678 PEDRO MUJICA
        next();
    } catch (error) {
        res.status(401).json({message: 'unauthorized'});
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles }});
    console.log(roles);
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }        
    }

    return res.status(403).json({message: "Require role moderator"});
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles }});
    console.log(roles);
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }        
    }

    return res.status(403).json({message: "Require role admin"});
}