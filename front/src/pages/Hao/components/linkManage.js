import React,{useState} from 'react'
import {Icon, message} from 'antd'
import {deleteLink,upLink,downLink} from './hooks'
import ConfirmModal from './confirmModal'
import LinkForm from './linkForm'

function LinkManage(props){

    const handleDeleteLink = ()=>{
        deleteLink({kindName:props.kindName,order:props.order,name:props.name}).then(res=>{
            if(res.data.message === "ok"){
                message.success("删除成功")
                props.getLinks()
                setVisible(false)
                props.handleClicked()
            }
        })
    }
    const up = ()=>{
        const {name,order,kindName} = props
        upLink({name,order,kindName}).then(res=>{
            if(res.data.message === "ok"){
                props.getLinks()
                props.handleClicked()
            }
        })
    }
    const down = ()=>{
        const {name,order,kindName} = props
        downLink({name,order,kindName}).then(res=>{
            if(res.data.message === "ok"){
                props.getLinks()
                props.handleClicked()
            }
        })
    }
    const [deleteModal,setVisible] = useState(false)
    const [linkFormVisible,setLinkFormVisible] = useState(false)

    return (
        <div className="link-manage-box" style={{position:'relative',marginRight:'1rem',marginBottom:'1rem'}}>
            <Icon type="form" className="pointed" 
            style={{position:'absolute',left:'0.1rem',top:'2rem',color:'#40a9ff'}}
            onClick={()=>setLinkFormVisible(true)}/>
            <Icon type="left" className="pointed" 
            style={{position:'absolute',left:'0.1rem',top:'0.2rem',color:'#faad14'}}
            onClick={up}/>
            <span className="linkmanage" onClick={props.handleClicked}>{props.name}</span>
            <Icon type="right" className="pointed" onClick={down}
            style={{position:'absolute',right:'0px',top:'0.2rem',color:'#faad14'}}
            />
            <Icon type="delete" className="pointed" onClick={()=>setVisible(true)}
            style={{position:'absolute',right:'0px',top:'2rem',color:'#ff4d4f'}}
            />

            <ConfirmModal title="删除书签" visible={deleteModal} onCancel={()=>setVisible(false)}
                onOk={handleDeleteLink} 
            >
                <p>你确认删除该书签吗</p>
            </ConfirmModal>
            <LinkForm 
                visible={linkFormVisible}  title="修改书签"
                close={()=>setLinkFormVisible(false)} 
                curKind={props.curKind} kindsData={props.kindsData} order={props.order} offManageStatus={props.handleClicked}
                getLinks={props.getLinks} type="change" name={props.name} url={props.url} kindName={props.kindName}
            />
        </div>
            
        
    )
}

export default LinkManage