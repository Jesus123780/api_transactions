import {
  INTEGER,
  STRING
} from 'sequelize'
import sequelizeConnection from '../../../repositories/repositories_sequelize'

const UserRiderModel = sequelizeConnection.define('userRider', {
  idUserRider: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: STRING,
    allowNull: false
  }
})

export default UserRiderModel
