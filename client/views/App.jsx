import React from 'react'
import {Link} from 'react-router-dom'
import Routes from '../config/router.jsx'

export default class App extends React.Component{
    render(){
        return[
            <Link to='/' key='1'>首页</Link>,
            <Link to='/detail' key='2'>详情页</Link>,

            <Routes key='3'/>
        ]
            
    }
}  