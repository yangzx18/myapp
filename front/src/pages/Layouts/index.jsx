import React,{useEffect,useReducer,Suspense} from 'react';
import { Route } from 'react-router-dom';
import routerConfig from '../config/router';
import {Layout,message,Spin} from 'antd'
import Head from './components/Head/head'
import './index.scss'
import {reducer,defaultStates,Context} from './context'

const {
    Header, Footer,Content,
  } = Layout;


function MyLayout(props){
    useEffect(()=>{
        let urlIsBad = true
        const hash = window.location.hash.slice(1)
        routerConfig.map((item)=>{
            if(item.path === hash){
                // console.log(`item.path:${item.path}`)
                // console.log(`hash:${window.location.hash.slice(1)}`)
                urlIsBad = false
                return
            }
        })
        if(urlIsBad){
            if( hash === '/'){
                props.history.replace("/Hao")
                return
            }
            message.warn("页面不存在，跳转至首页")
            setTimeout(()=>props.history.replace("/Hao"),1000)
            
            
            
        }
        
    },[window.location.hash])

    
    const [state,dispatch] = useReducer(reducer,defaultStates)
    return (
            <Layout>
                <Header>
                    <Head />
                </Header>

                <Content className="Content">
                    <Suspense fallback={<Spin size="large" tip="加载中" style={{marginLeft:"50%",marginTop:"25vh"}}/>}>
                        <Context.Provider value={{state,dispatch}}>
                            {routerConfig.map((item,i)=>
                            <Route key={i} path={item.path} 
                                render = {()=>{
                                    document.title=item.title
                                    return <item.component />
                                
                                }}
                            exact/>
                            )}
                        </Context.Provider>
                    </Suspense>
                    
                    
                    
                </Content>
                <Footer style={{textAlign:'center',marginTop: '2rem'}}>@copyRight yangzx 2019</Footer>
            </Layout>
        )
    }

export default MyLayout