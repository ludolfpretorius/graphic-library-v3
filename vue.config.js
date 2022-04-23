var path = require('path')
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                root: path.resolve(__dirname, '')
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/_variables.scss";`
            }
        }
    }
}
