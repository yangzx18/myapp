/// 显示操作 点击事件 
import React,{useState} from 'react'
import {Icon,message} from 'antd'
import {deleteKind,upKind,downKind} from './hooks'
import ConfirmModal from './confirmModal'
import KindForm from './kindForm'
export default (props)=>{

    const handleDelete = ()=>{
        deleteKind({
            "kindName": props.name,
            "order": props.order
        }).then(res=>{
            if(res.data.message === "ok"){
                message.success("删除成功")
                setDeleteModal(false)
                props.reGetKinds()
                props.handleClicked()
            }
        })
    }
    const up = ()=>{
        upKind({kindName:props.name,order:props.order}).then(res=>{
            if(res.data.message === "ok"){
                props.reGetKinds()
                props.handleClicked()
            }
        })
    }
    const down = ()=>{
        downKind({kindName:props.name,order:props.order}).then(res=>{
            if(res.data.message === "ok"){
                props.reGetKinds()
                props.handleClicked()
            }
        })
    }

    const [deleteModal,setDeleteModal] = useState(false)
    const [changeModal,setChangeModal] = useState(false)
    return (
        <div className="kind-manage-box">
            <Icon type="form" className="pointed" onClick={()=>setChangeModal(true)}
            style={{position:'absolute',left:'0.1rem',color:'#40a9ff',top:'2rem'}}
            />
            <Icon type="left" className="pointed" onClick={up}
            style={{position:'absolute',left:'0.1rem',top:'0.2rem',color:'#faad14'}}
            />
            <span className="kindmanage" onClick={props.handleClicked}>{props.name}</span>
            <Icon type="right" className="pointed" onClick={down}
            style={{position:'absolute',top:'0.2rem',color:'#faad14'}}
            />
            <Icon type="delete" className="pointed"  onClick={()=>setDeleteModal(true)}
            style={{position:'absolute',color:'#ff4d4f',top:'2rem'}}
            />

            <ConfirmModal title="删除分类" visible={deleteModal} onCancel={()=>setDeleteModal(false)}
            
            onOk={handleDelete}
            >
                <p>你确认删除该分类吗?</p>
                <p style={{color:'#ff7875'}}>删除分类将删除该分类下的所有书签！</p>
            </ConfirmModal>

            <KindForm visible={changeModal} close={()=>setChangeModal(false)} reGetKinds={props.reGetKinds} type="change" name={props.name} title="修改类别"/>
        </div>
        
    )
}