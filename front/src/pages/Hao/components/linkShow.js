import React,{useState, useEffect} from 'react'
import local from 'localforage'

function Link(props){
    const [visisted,setVisisted] = useState(false)

    const handleClicked = ()=>{
        let visistedSet
        local.getItem("todayVisisted").then(item=>{
            visistedSet = item
            visistedSet.add(props.name)
            local.setItem("todayVisisted",visistedSet)
        })
        
        setVisisted(true)
        props.handleClicked()
        // window.open(props.url)
    }
    useEffect(()=>{
        if(props.hasVisisted){
            setVisisted(true)
        }
    },[props.hasVisisted])

    const s = visisted ? "visisted linkshow" : "linkshow"
    return (
        <span onClick={handleClicked} className={s}>{props.name}</span>
    )
}

export default Link