import React,{useEffect} from 'react'

import {Form,Input,Modal,Select,message} from 'antd'
// import {useKinds} from './hooks'
import {addLink,changeLink} from './hooks'
const {Option} = Select

const LinkForm = (props)=>{

    const handleSubmit = ()=>{
        // e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(props.type === "change"){
                    // 修改书签
                    let params = {...values,order:props.order,changeKind:"false"}
                    if(props.curKind !== values['kindName']){
                        params['changeKind'] = "true"
                        params['oldKindName'] = props.curKind
                    }
                    changeLink(params).then(res=>{
                        if(res.data.message === "ok"){
                            message.success("修改成功")
                            props.close()
                            props.getLinks()
                            props.offManageStatus()
                            blankFormValue()
                      }else{
                          message.error(res.data.message)
                        }
                    })
                    return;
                }
                // 增加书签
              addLink(values).then(res=>{
                  if(res.data.message === "ok"){
                        message.success("添加成功")
                        props.close()
                        props.getLinks()
                        blankFormValue()
                  }
                  else{
                      message.error(res.data.message)
                  }
              })
            }
          });
    }
    const blankFormValue = ()=>{
        // 清空表单值，防止对话框再次打开时/再次添加书签遗留上次填写的值
        props.form.setFieldsValue({
            name: "",
            url: ""
        })
    }
    useEffect(()=>{
        /// 获取kinds
        props.form.setFieldsValue({
            kindName: props.curKind
        })

    },[props.curKind])
    
    useEffect(()=>{
        if(props.type === "change"){
            const {name,url,kindName} = props
            props.form.setFieldsValue({name,url,kindName})
        }
    },props.name)
    const { getFieldDecorator } = props.form;
    
    return (
        <Modal visible={props.visible} onCancel={props.close} 
        title={props.title}
        onOk={handleSubmit} okText="确认" cancelText="取消">
            <Form>
            <Form.Item label="书签名">
                {getFieldDecorator('name', {
                rules: [
                {
                    required: true,
                    message: '请输入书签名',
                }
                ],
            })(<Input />)}
            </Form.Item>
            <Form.Item label="网址">
                {getFieldDecorator('url', {
                    rules: [
                    {
                        required: true,
                        message: '请输入网址',
                    }
                    ],
                })(<Input />)}
            </Form.Item>
            <Form.Item label="分类">
                {getFieldDecorator('kindName', {
                    })(
                    <Select style={{ width: 150 }}>
                        {
                            props.kindsData.map((item,i)=><Option value={item[0]} key={i}>{item[0]}</Option>)
                        }
                    </Select>,
                    )}
            </Form.Item>
            </Form>
        </Modal>
        
    )
} 
export default Form.create()(LinkForm);