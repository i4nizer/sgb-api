import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize"
import type {
    InitOptions,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize"

//

class Detection extends Model<InferAttributes<Detection>, InferCreationAttributes<Detection>> {
    declare id: CreationOptional<number>
    declare box: { x: number, y: number, w: number, h: number }
    declare class: string
    declare confidence: number
    declare captureId: ForeignKey<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

//

const detectionAttr: ModelAttributes<Detection, InferAttributes<Detection>> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    box: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confidence: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    captureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { key: "id", model: "captures" },
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

const detectionOpts = (sequelize: Sequelize): InitOptions<Detection> => ({
    sequelize,
    tableName: "detections",
    timestamps: true,
})

//

export { Detection, detectionAttr, detectionOpts }
