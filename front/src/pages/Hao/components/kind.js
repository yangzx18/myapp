import React,{useState, useEffect} from 'react'
import KindShow from './kindShow'
import KindManage from './kindManage'

export default (props)=>{
    const [status,setStatus] = useState("show")

    const handleClicked = ()=>{
        if(props.status === "show"){
            // window.open(props.url)
            props.clicked()
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
        return (
            <KindShow name={props.name} handleClicked={handleClicked} isCurKind={props.isCurKind}/>
        )
    }
    else if(status === "manage" && props.status === "manage"){
        return (
            <KindManage name={props.name} handleClicked={handleClicked} order={props.order} reGetKinds={props.reGetKinds} isCurKind={props.isCurKind}/>
        )
    }
}