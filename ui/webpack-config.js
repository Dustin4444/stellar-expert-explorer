const path = require('path')
const {initWebpackConfig} = require('@stellar-expert/webpack-template')
const pkgInfo = require('./package.json')

const {API_ENDPOINT, DIRECTORY_ADMINS, OAUTH_GITHUB_CLIENTID, TURNSTILE_KEY} = process.env

const outputPath = path.join(__dirname, './public/')

module.exports = initWebpackConfig({
    entries: {
        app: {
            import: path.join(__dirname, './app.js'),
            htmlTemplate: './static-template/index.html'
        }
    },
    outputPath,
    staticFilesPath: [
        './static/',
        {
            from: path.join(__dirname, './static-cloudflare'),
            info: {minimized: true}
        }
    ],
    scss: {
        additionalData: '@import "~@stellar-expert/ui-framework/basic-styles/variables.scss";',
        sassOptions: {
            quietDeps: true,
            silenceDeprecations: ['import']
        }
    },
    define: {
        appVersion: pkgInfo.version,
        envSettings: {
            API_ENDPOINT,
            DIRECTORY_ADMINS,
            OAUTH_GITHUB_CLIENTID,
            TURNSTILE_KEY
        }
    },
    devServer: {
        host: '0.0.0.0',
        server: {
            type: 'https'
        },
        port: 9001
    }
})
