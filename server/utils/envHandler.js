import configuration from './../../config/config.json';

export default () => {
    if (process.env.NODE_ENV === 'dev') {
        return {
            PORT: process.env.PORT || configuration.port.dev,
            dbDetails: configuration.db.dev,
            secretKey: configuration.secretKey
        };
    } else if (process.env.NODE_ENV === 'prod') {
        return {
            PORT: process.env.PORT || configuration.port.prod,
            dbDetails: configuration.db.prod,
            secretKey: configuration.secretKey
        };
    } else if (process.env.NODE_ENV === 'test') {
        return {
            PORT: process.env.PORT || configuration.port.test,
            dbDetails: configuration.db.test,
            secretKey: configuration.secretKey
        };
    } else {
        console.log('no environment selected');
        throw new Error('Select an environment - prod or dev');
    }
};