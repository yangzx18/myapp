import React,{useEffect} from 'react'
import {Modal,Form,Input,message} from 'antd'
import {addKind,renameKind} from './hooks'



function KindForm(props){

    const { getFieldDecorator } = props.form;
    
    const success = (m)=>{
        message.success(m)
        props.close()
        props.reGetKinds()
    }
    const _error = (m)=>{
        message.error(m)
    }
    const handleSubmit = ()=>{
        // e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(props.type === 'change'){
                    renameKind({kindName:values['kindName'],oldName:props.name}).then(res=>{
                        if(res.data.message === "ok"){
                            success("修改成功")
                          }
                    })
                    return
                }

              addKind(values).then(res=>{
                  if(res.data.message === "ok"){
                    success("添加成功")
                  }
                  else{
                      _error(res.data.message)
                  }
              })
            }
          });
    }
    useEffect(()=>{
        if(props.type === "change"){
            props.form.setFieldsValue({kindName:props.name})
        }
    },[props.visible]) /// 会运行三遍
    return (
        <Modal visible={props.visible} onCancel={props.close} 
        title={props.title}
        onOk={handleSubmit} okText="确认" cancelText="取消">
            <Form>
                <Form.Item label="类别名">
                    {getFieldDecorator('kindName', {
                    rules: [
                    {
                        required: true,
                        message: '请输入分类名',
                    }
                    ],
                })(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Form.create()(KindForm);