import {useState,useEffect} from 'react'
import axios from 'axios'
import qs from 'qs'


export function useLinks(){
    const [data,setData] = useState([])
    const url = "/api/linkbook/links"
    
    const getLinks = (kindname)=>{
        axios.get(url,{params:{kindName:kindname}}).then(res=>{
            // console.log(res.data.data[0])
            setData(res.data.data)
        })
    }// 执行一次

    return [data,getLinks]

}

export function useKinds(){
    const [data,setData] = useState([])
    const url = "/api/linkbook/kinds"

    const reGetKinds = ()=>{
        axios.get(url).then(res=>{
            setData(res.data.data) 
        })
    }
    useEffect(()=>{
        reGetKinds()

    },[])
    

    return [data,reGetKinds]
}

export function addLink(params){
    const url = "/api/linkbook/links/add"

    return axios.post(url,qs.stringify(params))
}

export function deleteLink(params){
    const url = "/api/linkbook/links/delete"

    return axios.post(url,qs.stringify(params))
}

export function upLink(params){
    const url = "/api/linkbook/links/up"

    return axios.post(url,qs.stringify(params))
}

export function downLink(params){
    const url = "/api/linkbook/links/down"

    return axios.post(url,qs.stringify(params))
}

export function changeLink(params){
    const url = "/api/linkbook/links/change"

    return axios.post(url,qs.stringify(params))
}

export function addKind(params){
    const url = "/api/linkbook/kinds/add"
    return axios.post(url,qs.stringify(params))

}

export function deleteKind(params){
    const url = "/api/linkbook/kinds/delete"
    return axios.post(url,qs.stringify(params))
}

export function upKind(params){
    const url = "/api/linkbook/kinds/up"
    return axios.post(url,qs.stringify(params))
}

export function downKind(params){
    const url = "/api/linkbook/kinds/down"
    return axios.post(url,qs.stringify(params))
}

export function renameKind(params){
    const url = "/api/linkbook/kinds/rename"
    return axios.post(url,qs.stringify(params))
}