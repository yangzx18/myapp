import React,{useState, useEffect} from 'react'
import LinkShow from './linkShow'
import LinkManage from './linkManage'

function Link(props){

    const [status,setStatus] = useState("show")

    const handleClicked = ()=>{
        if(props.status === "show"){
            window.open(props.url)
        }
        else{
            const s = status === "manage" ? "show" : "manage"
            setStatus(s)
        }
    }
    useEffect(()=>{
        ///  消除之前的管理状态下的选中状态
        if(props.status === "show"){
            setStatus("show")
        }
    },[props.status])

    if(status === "show" || props.status === "show"){
        ///  不同时存在都为show
        return (
            <LinkShow name={props.name} url={props.url} handleClicked={handleClicked} hasVisisted={props.hasVisisted}/>
        )
    }
    else if(status === "manage" && props.status === "manage"){
        return (
            <LinkManage name={props.name} handleClicked={handleClicked} order={props.order} 
            kindName={props.kindName} getLinks={props.getLinks} url={props.url}
            curKind={props.curKind} kindsData={props.kindsData}
            />
        )
    }
}


export default Link