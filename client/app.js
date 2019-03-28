import React from 'react'
import ReactDom from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {BrowserRouter} from 'react-router-dom'
import App from './views/App.jsx'


const root = document.getElementById('root')
const render = Component=>{
    ReactDom.hydrate(
    <AppContainer>
        <BrowserRouter>
            <Component/>
        </BrowserRouter>
    </AppContainer>,root)
}

render(App)
//配置热插拔
if(module.hot){
    module.hot.accept('./views/App.jsx',()=>{
        const nextApp = require('./views/App.jsx').default
        render(nextApp)
    })
}