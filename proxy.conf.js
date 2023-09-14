const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:5020',
        secure: false,
        logLevel: 'debug',
        changeOrigin: true
    }
];

module.exports = PROXY_CONFIG;