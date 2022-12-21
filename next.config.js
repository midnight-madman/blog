module.exports = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    // eslint-disable-next-line no-unused-vars
    webpack: (config, {dev, isServer}) => {
        // Replace React.js with Preact.js in production build
        // if (!dev && !isServer) {
        //     Object.assign(config.resolve.alias, {
        //         react: 'preact/compat',
        //         'react-dom/test-utils': 'preact/test-utils',
        //         'react-dom': 'preact/compat',
        //     });
        // }
        config.resolve = {
            ...config.resolve,
            fallback: {
                "fs": false,
                "path": false,
                "os": false,
            }
        }
        return config;
    },
};
