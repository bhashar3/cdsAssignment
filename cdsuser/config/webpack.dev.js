const {merge}=require('webpack-merge');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ModuleFederationPlugin=require('../src/plugin/ModuleFederationPlugin');
//const  ModuleFederationPlugin = require('webpack').container;
//const ModuleFederationPlugin=require('@module-federation/node');

const commonConfig=require('./webpack.common');
const packageJson=require('../package.json');
const devConfig={
    mode:'development',
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
      },
    devServer:{
        port:3000,
        historyApiFallback:{
            index:'index.html'
        },
        headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins (for development)
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
          }
}
,plugins:[
    new ModuleFederationPlugin({
        name:'cdsuser',
        filename:'remoteEntry.js',
        exposes:{
            './CDSUser':'./src/App.js',
            './userVersion':'./src/Version.js'
        },
        shared:{'react':{
            requiredVersion:'^18.2.0',
            singleton:true
        },'react-dom':{
            requiredVersion:'^18.2.0',
            singleton:true
        }
    }
        //shared:packageJson.dependencies,
    })
    ,
    //"@babel/plugin-transform-runtime",
    new HtmlWebpackPlugin({
        template:'./public/index.html',
    })
]
}
module.exports=merge(commonConfig,devConfig);