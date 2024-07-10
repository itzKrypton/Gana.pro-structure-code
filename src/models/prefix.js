const { DataTypes } = require('sequelize');
const { prefixSequelize } = require('../database');

const Prefix = prefixSequelize.define('Prefix', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    prefix: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    oldPrefix: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    moderator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastUpdated: {
        type: DataTypes.STRING,
        defaultValue: () => new Date().getDate().toString(), // Default value as current date string
    },
}, {
    tableName: 'prefixes',
    timestamps: false,
});


module.exports = Prefix;
