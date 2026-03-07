import env from "@/config/env.config.js"
import { Sequelize } from "sequelize"
import { Capture, captureAttr, captureOpts, } from "@/models/capture.model.js"
import { Detection, detectionAttr, detectionOpts } from "@/models/detection.model.js"
import { Reading, readingAttr, readingOpts } from "@/models/reading.model.js"
import { Settings, settingsAttr, settingsOpts } from "@/models/settings.model.js"
import { Threshold, thresholdAttr, thresholdOpts } from "@/models/threshold.model.js"
import { User, userAttr, userOpts } from "@/models/user.model.js"

//

const boot = async () => {
    const { user, pass, host, port, name, log, dialect } = env.database
    const url = `${dialect}://${user}:${pass}@${host}:${port}`
    const sequelize = new Sequelize(`${url}/${name}`, { logging: log && console.log })

    Capture.init(captureAttr, captureOpts(sequelize))
    Detection.init(detectionAttr, detectionOpts(sequelize))
    Reading.init(readingAttr, readingOpts(sequelize))
    Settings.init(settingsAttr, settingsOpts(sequelize))
    Threshold.init(thresholdAttr, thresholdOpts(sequelize))
    User.init(userAttr, userOpts(sequelize))

    Capture.hasMany(Detection, { foreignKey: "captureId", onDelete: "CASCADE" })
    Detection.belongsTo(Capture, { as: "capture", foreignKey: "captureId" })

    await sequelize.authenticate()
    const { sync, alter, force } = env.database
    if (sync) await sequelize.sync({ alter, force })
    console.info(`[Boot.Sequelize]: ${sync ? `Synced` : `Connected`} successfully.`)
}

//

export default { boot }
