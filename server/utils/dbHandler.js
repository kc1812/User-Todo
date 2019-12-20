import env from './envHandler';
import Sequelize from 'sequelize';

const dbDetails = env().dbDetails;

const db = new Sequelize(dbDetails.database, dbDetails.user, dbDetails.password, {
    host: dbDetails.host,
    dialect: dbDetails.dialect,
    port: dbDetails.port
});
function openConnection() {
    return db.authenticate();
}

function closeConnection(callback) {
    db.close().then(() => {
        console.log('db disconnected');
        callback();
    });
}

export default {
    openConnection,
    closeConnection,
    db
};