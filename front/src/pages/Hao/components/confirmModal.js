import React from 'react'
import {Modal} from 'antd'


export default (props)=>{
    return (
        <Modal title={props.title} visible={props.visible} onOk={props.onOk} onCancel={props.onCancel}
        okText="确认" cancelText="取消"
        >
            {props.children}
        </Modal>
    )
}