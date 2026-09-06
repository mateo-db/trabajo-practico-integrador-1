import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const ArticleTag = sequelize.define("ArticleTag", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
    },
    article_id: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: "Articles",
            key: "id",
        },
    },
    tag_id: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: "Tags",
            key: "id",
        },
    },
    timestamps: true,
});