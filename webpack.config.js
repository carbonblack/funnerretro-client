const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname),
}

module.exports = env => {
    const production  = env.NODE_ENV === 'production'
    const proxyAPIUrl = `${ production ? 'https' : 'http' }://localhost:4433`

    return {
        entry: {
            index: path.join(paths.SRC, 'components/Index.jsx')
        },
        devServer: {
            contentBase: paths.SRC,
            proxy: [{
                context: [
                    '/api/**'
                ],
                target: proxyAPIUrl,
                secure: production
            }]
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [
                paths.SRC,
                path.resolve('./node_modules')
            ]
        },
        output: {
            path: paths.DIST,
            filename: 'app.bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: paths.SRC,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.(png|svg|pem)$/,
                    include: path.join(paths.SRC, 'assets'),
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    include: path.join(paths.SRC, 'assets'),
                    use: ['style-loader','css-loader']
                }
            ],
        },
         plugins: [
            new HtmlWebpackPlugin({
                template: path.join(paths.SRC, 'assets/index.html'),
            })
        ]
    }   
}
