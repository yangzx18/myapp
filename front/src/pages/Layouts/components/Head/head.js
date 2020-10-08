import React from 'react'
import './head.scss'
import {NavLink} from 'react-router-dom'
import links from './config'
const Head = ()=>{
    
    return (
        <div className="hori_list fs-big">
            {
                    
                links.map((item,i)=>{
                return <span key={i}><NavLink to={item.path} activeClassName="white">{item.text}</NavLink></span>
                })
            }
        </div>
    )
}

export default Head