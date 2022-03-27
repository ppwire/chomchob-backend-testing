import sequelize from "../db.js";
import Sequelize from 'sequelize';

const Code = sequelize.define('code', {
   id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
   },
})

export default Code