import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Reading extends Model<InferAttributes<Reading>, InferCreationAttributes<Reading>> {
    declare id: CreationOptional<number>
    declare name: string
    declare unit: string
    declare icon: string
    declare value: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const readingAttr: ModelAttributes<Reading, InferAttributes<Reading>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
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

const readingOpts = (sequelize: Sequelize): InitOptions<Reading> => ({
    sequelize,
    tableName: "readings",
    timestamps: true,
})

//

export { Reading, readingAttr, readingOpts }
