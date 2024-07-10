const { Sequelize } = require('sequelize');
const path = require('path');

// Set up Sequelize to use SQLite
const prefixSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'prefix.sqlite'),
    logging: false
});

const autoreconnectSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'autoreconnect.sqlite'),
    logging: false
});

const noprefixSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'noprefix.sqlite'),
    logging: false
});

const playlistSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'playlists.sqlite'),
    logging: false
});

const blacklistSequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'blacklist.sqlite'),
    logging: false
});

// Function to initialize the databases
async function initializeDatabase() {
    await prefixSequelize.sync({ alter: true });
    await autoreconnectSequelize.sync({ alter: true });
    await noprefixSequelize.sync({ alter: true });
    await playlistSequelize.sync({ alter: true });
    await blacklistSequelize.sync({ alter: true });
    console.log('Database synchronized');
}

module.exports = {
    prefixSequelize,
    autoreconnectSequelize,
    noprefixSequelize,
    playlistSequelize,
    blacklistSequelize,
    initializeDatabase
};