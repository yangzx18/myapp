// import lazy from 'react-lazy'
// import Loding from '../../components/DelayLoading'
import {lazy} from 'react'
const Hao = lazy(()=>import('../Hao'))
const Todo = lazy(()=>import('../Todo'))
export default [
    {
        'path': '/Hao',
        'component': Hao,
        'title': 'LinkBook'
    },
    {
        'path': '/Todo',
        'component': Todo,
        'title': 'ToDo'
    }
]