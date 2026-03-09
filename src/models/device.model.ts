import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Device extends Model<InferAttributes<Device>, InferCreationAttributes<Device>> {
    declare id: CreationOptional<number>
    declare token: string
    declare userId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const deviceAttr: ModelAttributes<Device, InferAttributes<Device>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
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

const deviceOpts = (sequelize: Sequelize): InitOptions<Device> => ({
    sequelize,
    tableName: "devices",
    timestamps: true,
})

//

export { Device, deviceAttr, deviceOpts }
