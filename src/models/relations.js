//importamos los modelos a relacionar
import { User } from "./user.model.js";
import { Profile } from "./profile.model.js";
import { Tag } from "./tag.model.js";
import { Article } from "./article.model.js";
import { ArticleTag } from "./article_tag.model.js";

//creamos función con nuestras relaciones dentro para luego exportarla en nuestro archivo central del servidor (app.js)
export const setupRelations = () => {
    //relación 1:1 entre modelo "User" y "Profile"
    //los aliases dependen de desde que modelo esté mirando al otro y la palabra que mejor describa la relación que mantiene el modelo "observado" con respecto al modelo "observador"
    User.hasOne(Profile, {
        foreignKey: "user_id",
        as: "profile", // en este caso, estamos parados en el modelo "User" mirando hacia el modelo "Profile", entonces nos hacemos la pregunta, "¿que representa el modelo observado "Profile" para el observador "User"?" o "¿cual es la relación del modelo "Profile" con respecto a "User"?, la respuesta en ambos casos es "perfil", de ahí el alias que colocamos en esta dirección de la relación
        onDelete: "CASCADE"
    });
    Profile.belongsTo(User, {
        foreignKey: "user_id",
        as: "owner" // en este caso, estamos parados en el modelo "Profile" mirando hacia el modelo "User", entonces nos hacemos la pregunta, "¿que representa el modelo observado "User" para el observador "Profile"?" o "¿cual es la relación del modelo "User" con respecto a "Profile"?, la respuesta en ambos casos es "dueño" o "propietario", de ahí el alias que colocamos en esta dirección de la relación
    });
    // relación 1:N (uno a muchos) entre modelo "User" y "Article"
    User.hasMany(Article, {
        foreignKey: "user_id",
        as: "articles" // en este caso, el alias va en plural ya que estamos mirando desde el modelo "User" hacia el modelo "Article", que representa el lado de muchos en nuestra relación 1:N, el usuario tendrá muchos "articulos" cuando hagamos la consulta
    });
    Article.belongsTo(User, {
        foreignKey: "user_id",
        as: "author"
    });
    // relación N:M (muchos a muchos) entre modelos "Article" y "Tag" a través del modelo de tabla intermedia "ArticleTag"
    Article.belongsToMany(Tag, {
        through: ArticleTag, // en este caso tenemos que especificar a través de que modelo de tabla intermedia se relacionan estos dos modelos, "Article" y "Tag"
        foreignKey: "article_id", // para las FKs simplemente respetamos la dirección de la relación, en este caso miramos desde el modelo "Article" hacia el modelo "Tag", por ende como FK va "article_id"
        as: "tags", //en el caso de N:M, miramos al modelo observado y añadimos un alias descriptivo de el en plural
        onDelete: "CASCADE"
    });
    Tag.belongsToMany(Article, {
        through: ArticleTag,
        foreignKey: "tag_id",
        as: "articles"
    })

};