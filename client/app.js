import React from 'react'
import ReactDom from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './App.jsx'


const root = document.getElementById('root')
const render = Component=>{
    ReactDom.hydrate(<AppContainer>
        <Component/>
    </AppContainer>,root)
}

render(App)
//配置热插拔
if(module.hot){
    module.hot.accept('./App.jsx',()=>{
        const nextApp = require('./App.jsx').default
        render(nextApp)
    })
}