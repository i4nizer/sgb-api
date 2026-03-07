import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Settings extends Model<InferAttributes<Settings>, InferCreationAttributes<Settings>> {
    declare id: CreationOptional<number>
    declare sms: boolean
    declare email: boolean
    declare userId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const settingsAttr: ModelAttributes<Settings, InferAttributes<Settings>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sms: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { key: "id", model: "users" },
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

const settingsOpts = (sequelize: Sequelize): InitOptions<Settings> => ({
    sequelize,
    tableName: "settingss",
    timestamps: true,
})

//

export { Settings, settingsAttr, settingsOpts }
