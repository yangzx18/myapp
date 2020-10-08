import React,{useState, useEffect,useContext} from 'react'
// import axios from 'axios'
// import qs from 'qs'
import './index.scss'
import Link from './components/link'
import Kind from './components/kind'
import {Row,Col,Divider,Switch,Button} from 'antd'
import {useLinks,useKinds} from './components/hooks'
import LinkForm from './components/linkForm'
import KindForm from './components/kindForm'
import Search from './components/search'
import local from 'localforage'
import {Context} from '../Layouts/context'
import QueueAnim from 'rc-queue-anim';

function Hao(){

    const [linkManageStatus,setMl] = useState(false)
    const [kindManageStatus,setMK] = useState(false)
    const [linkFormVisible,setLinkFormVisible] = useState(false)
    const [kindkFormVisible,setKindFormVisible] = useState(false)

    
    const [linkData,getLinks] = useLinks()
    const [KindData,reGetKinds] = useKinds()
    const [visisted,setVisisted] = useState([])

    const context = useContext(Context)
    const {curKind} = context.state

    //初始化curkind
    useEffect(()=>{

        if(KindData[0] && curKind === ''){
            if(KindData[0][0]){
                setCurKind(KindData[0][0])
            }
                
        }
        
    },[KindData])
    
    /// 切换当前分类时重新请求数据
    useEffect(()=>{
        if(curKind!==''){
            getLinks(curKind)
        }
        loadHistory()
        
    },[curKind])
    const setCurKind = (value)=>{
        context.dispatch({type:'SET_KINDNAME',value:value})
    }


    // 读取当日浏览记录
    const loadHistory = ()=>{
        local.getItem("todayVisisted").then(item=>{
            if(item === null){
                local.setItem("todayVisisted",new Set())
                setVisisted(new Set())
            }
            /// 如果 todayVisisted 已经初始化过
            else{
                
                local.getItem("visistedDate").then(today=>{
                    const todayDate = new Date().getDate()
                    if(todayDate !== today){
                        // 清空昨天的，只保存当日的记录
                        setVisisted(new Set())
                        local.setItem("todayVisisted",new Set())
                        local.setItem("visistedDate",todayDate)

                        return
                    }
                    setVisisted(item) // todayVisisted 的 item
                    // console.log(item)
                })
            }
            
        })
    }
    useEffect(()=>{
        ///////  从其它路由跳转到导航 visisted 会丢失，导致白屏
        if(!(visisted instanceof Set)){
            loadHistory()
            
        }
    },[visisted])
    const handleLinkMangeClick = ()=>{
        setMl(!linkManageStatus)
    }
    const handleKindMangeClick = ()=>{
        setMK(!kindManageStatus)
    }
    const addLink = ()=>{
        setLinkFormVisible(true)
    }
    const addKind = ()=>{
        setKindFormVisible(true)
    }

    const LinkStatus = linkManageStatus ? "manage" : "show"
    const KindStatus = kindManageStatus ? "manage" : "show"

    return (
        <Row>
            <Col xxl={{span:16,offset:4}} md={{span:22,offset:1}} lg={{span:20,offset:2}}>
                <Row>
                    <Search />
                </Row>
                <Row className="kinds">
                    <Row className="manage" style={{marginBottom:'1rem'}}>
                        <Col lg={{span:2,offset:22}} xxl={{span:2,offset:22}} sm={{span:6,offset:18}}>
                            <Switch onClick={handleKindMangeClick} checkedChildren="管理" unCheckedChildren="管理"/>
                        </Col>
                    </Row>
                    <Row type="flex">
                        <QueueAnim interval={100}>
                        {
                            KindData.map((item,i)=>{
                                if(item[0] !== curKind){
                                    return <Kind name={item[0]} status={KindStatus} order={item[1]} reGetKinds={reGetKinds} clicked={()=>setCurKind(item[0])} key={item[0]}/>
                                }
                                return <Kind name={item[0]}  isCurKind="true" status={KindStatus} order={item[1]} reGetKinds={reGetKinds} clicked={()=>setCurKind(item[0])}  key={item[0]}/>
                            })
                        }
                        { kindManageStatus && <Button icon="plus" onClick={addKind} style={{marginTop:'-0.3rem'}}></Button> }
                        </QueueAnim>
                    </Row>
                    
                    
                </Row>

                <Divider />

                <Row className="links">
                    <Row className="manage" style={{marginBottom:'1rem'}}>
                        <Col lg={{span:3,offset:21}} xxl={{span:2,offset:22}} sm={{span:6,offset:18}}>
                            <Switch onClick={handleLinkMangeClick} checkedChildren="管理" unCheckedChildren="管理"/>
                        </Col>
                    </Row>
                    <QueueAnim duration={300}
                        // animConfig={[
                        //     { opacity: [1, 0], translateX: [0, -200] },
                        //     { opacity: [1, 0], translateX: [0, 200] }
                        // ]}
                        type={['right','left']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                    >
                    <Row type="flex" key={curKind}>
                        
                        {
                            linkData.map((item,i)=>{
                                const hasVisisted = visisted instanceof Set ? 
                                    visisted.has(item[0]) ? true : false 
                                    : false
                                
                                return <Link name={item[0]} url={item[1]} 
                                status={LinkStatus} key={item[0]} order={item[3]} 
                                kindName={item[2]} getLinks={()=>getLinks(curKind)}
                                curKind={curKind} kindsData={KindData} hasVisisted={hasVisisted}
                            />})
                        }
                            {
                                linkData.length === 0 && !linkManageStatus ? <p>书签为空，点击右方管理添加书签～</p> : ''
                            }
                        { linkManageStatus && <Button icon="plus" onClick={addLink} style={{marginTop:'0.6rem'}}></Button> }
                        
                    </Row>
                    </QueueAnim>
                
                
                </Row>
            </Col>
            <KindForm visible={kindkFormVisible} close={()=>setKindFormVisible(false)} reGetKinds={reGetKinds}
                title="添加类别"
            />
            <LinkForm 
                visible={linkFormVisible} title="添加书签"
                close={()=>setLinkFormVisible(false)} 
                curKind={curKind} kindsData={KindData}
                getLinks={()=>getLinks(curKind)}
            />
            
        </Row>       
    )
}


export default Hao