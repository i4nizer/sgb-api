import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from "sequelize"

//

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare name: string
    declare role: string
    declare email: string
    declare phone: string
    declare password: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const userAttr: ModelAttributes<User, InferAttributes<User>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "email",
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}

//

const userOpts = (sequelize: Sequelize): InitOptions<User> => ({
    sequelize,
    tableName: "users",
    timestamps: true,
})

//

export { User, userAttr, userOpts }
