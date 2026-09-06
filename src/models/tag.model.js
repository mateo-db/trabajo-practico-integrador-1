import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const Tag = sequelize.define("Article", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
    },
    timestamps: true,
});