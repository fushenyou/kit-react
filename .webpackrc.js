const path = require('path');
export default {
    entry: './example/src/index.tsx',
    outputPath: 'dist',
    devtool: 'source-map',
    html: {
        template: './example/index.ejs'
    },
    browserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
    extraBabelPlugins: [
        'transform-decorators-legacy'
    ],
    alias: {
        'kit-react': path.resolve(__dirname, 'components/')
    },
    ignoreMomentLocale: true,
    hash: true,
    publicPath: '/'
};
