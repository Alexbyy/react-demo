import React from 'react'
import {
    Route,
} from 'react-router'
import TopicList from '../views/topic-list/index.jsx'
import TopicDetail from '../views/topic-detail/index.jsx'

//因为返回的时一个数组，所以需要给每一项添加key
export default ()=>[
    //exact的意思是精准匹配该项的路径
    <Route path='/' component={TopicList} key='1' exact></Route>,
    <Route path='/detail' component={TopicDetail} key='2'></Route>
]