module.exports={
    module:{
        rules:[
            {
                test:/\m?js$/,
                exclude:/node_modules/,
                use:{
                    loader:require.resolve('babel-loader'),

                    options:{
        
                        presets:['@babel/preset-react','@babel/preset-env'],
                        plugins:['@babel/plugin-transform-runtime']
                    }
                }
               
            },
            {
                test:/.scss$/, 
                use: ["style-loader",
                      "css-loader",
                      "sass-loader" ],
            },
               { test: /\.css$/, 
                use: ["style-loader",
                      "css-loader"]}
             
        // {test: /\.(ts|tsx)?(\.erb)?$/,
        // use: [{
        //   loader: 'ts-loader'
        // }]},
        // {
        //     test: '/\.scss$/',
        //     use: ['style-loader', 'css-loader', 'sass-loader']
        //   }
        ]
        
    }
    // resolve:{
    //     extensions:['.js','.jsx','.tsx','.scss','.css','.json']
    // }
}