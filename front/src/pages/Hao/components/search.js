import React,{useState, useEffect} from 'react'
import {Input,Select,Col,Row,Icon} from 'antd'

const {Option} = Select

const search_list = {
    "baidu": 'https://www.baidu.com/s?wd=',
    "bing": "https://cn.bing.com/search?q=",
    "sougou": 'http://www.sogou.com/web?query=',
    "weixin": "https://weixin.sogou.com/weixin?type=2&query=",
    "google": "https://www.google.com.hk/search?q="
}

export default ()=>{
    const [engineer,setEngineer] = useState('baidu')
    const [searchWord,setSearchWord] = useState('')

    const handleInput = (e)=>{
        setSearchWord(e.target.value)
    }
    useEffect(()=>{
        const searchEngineer = localStorage.getItem('searchEngineer')
        if(!searchEngineer){
            localStorage.setItem('searchEngineer','baidu')
            setEngineer('baidu')
        }
        setEngineer(searchEngineer)
    },[])
    const _setEngineer = (value)=>{
        localStorage.setItem('searchEngineer',value)
        setEngineer(value)
    }
    const open = ()=>{
        const url = search_list[engineer] + searchWord 
        window.open(url);
        setSearchWord('')
    }
    const search = (e)=>{
        if(e.which === 13){
            open()   
        }
        

    }
    return (
            <Row className="search" onKeyPress={search}>
                <Col xxl={{span:2,offset:5}} lg={{span:3,offset:3}} sm={{span:3}}>
                    <Select onSelect={(value)=>_setEngineer(value)} maxTagTextLength={6} value={engineer} size="large">
                        <Option value="baidu">百度</Option>
                        <Option value="bing">必应</Option>
                        <Option value="weixin">微信</Option>
                        <Option value="sougou">搜狗</Option>
                        <Option value="google">谷歌</Option>
                    </Select>
                </Col>
                <Col xxl={{span:12,offset:0}} lg={{span:15}} sm={{span:21}}>
                
                    <Input onChange={handleInput} value={searchWord} size="large" 
                        suffix={<Icon type="search" size="large" onClick={open}/>}
                    />
                </Col>
            </Row>
            
    )
}