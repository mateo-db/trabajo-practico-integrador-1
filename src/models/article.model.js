import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const Article = sequelize.define("Article", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(200),
    },
    content: {
        type: DataTypes.TEXT,
    },
    excerpt: {
        type: DataTypes.STRING(500),
    },
    status: {
        type: DataTypes.ENUM("published", "archived", {default: "published"}),
    },
    user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: "Users",
            key: "id",
        },
    },
    timestamps: true,
});