import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import User from './user.js';

const Preferences = sequelize.define('Preferences', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id'
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    field: 'userID'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'startDate'
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'endDate'
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'destination'
  },
  vacationType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'vacationType'
  }
}, {
  tableName: 'tbl_35_preferences',
  timestamps: false
});

User.hasMany(Preferences, { foreignKey: 'userID' });
Preferences.belongsTo(User, { foreignKey: 'userID' });

export default Preferences;
