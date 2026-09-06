//importamos libreria y herramientas a usar
import { DataTypes } from "sequelize";
//importamos instancia de sequelize 
import { sequelize } from "../config/database.js";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(20),
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
    },
    role: {
        type: DataTypes.ENUM("user", "admin", {default: "user"})
    },
    timestamps: true,
    paranoid: true
});