import React,{Component} from 'react'
import {Input,message,Icon} from 'antd'
import './index.scss'
import localforage from 'localforage'


export default class Todo extends Component{
    state = {
        items: [],
        input_value: '',
        edit_i: null,
        edit_value: ''
    }
    handleInput = (e)=>{
        const value = e.target.value
        this.setState({
            input_value: value
        })
    }
    addItem = ()=>{
        let {items,input_value} = this.state

        const remove_blank_value = input_value.replace(/\s+/g,"")
        if(remove_blank_value === ''){
            ///  为空或全是空格
            message.warning("输入为空")
            return
        }

        items.push(input_value)
        this.setState({
            items: items,
            input_value: ''
        })
        message.success("添加成功")
    }
    handleDelete = i=>{
        let {items} = this.state
        items.splice(i,1)
        this.setState({items})
        this.save()
    }
    componentDidMount(){
        localforage.getItem('todoData').then(data=>{
            data = data ? data : []
            this.setState({
                items: data
            })
        })
        
    }
    handleEnter = (e)=>{
        if(e.which === 13){
            if(this.state.edit_i === null)
                this.addItem()
                this.save()
        }
    }
    save = ()=>{
        localforage.setItem('todoData',this.state.items)
        // message.success("保存成功")
    }
    edit = i=>{
        this.setState({
            edit_i: i,
            edit_value: this.state.items[i]
        })
    }
    editing = (e)=>{
        const value = e.target.value
        // let {items} = this.state
        this.setState({
            edit_value: value
        })
    }
    edited = e=>{
        if(e.which === 13){
            let {items,edit_i,edit_value} = this.state
            items[edit_i] = edit_value
            this.setState({
                items,
                edit_i: null
            })
            message.success("修改成功")
            this.save()
        }
    }
    componentWillUnmount(){
        this.save()
    }
    render(){
        const {items,input_value,edit_i,edit_value} = this.state
        return (
            <div className="todo_box" onKeyPress={this.handleEnter}>
                <h1>Todo</h1>
                <div className="input">
                    <Input placeholder="待办" onChange={this.handleInput} className="input_field"
                        size = "large"　value={input_value}
                    />
                </div>
                <ul className="items">
                    {
                        items.map((item,i)=> edit_i !== i ?
                        <li key={i}>{item}
                        <div className="operate">
                        {/* <Icon type="loading" /> */}
                        <Icon type="edit" onClick={this.edit.bind(this,i)}/>
                        <Icon type="delete" onClick={this.handleDelete.bind(this,i)}/>
                        </div>
                        </li>
                        :
                        <li key={i}><Input onChange={this.editing} className="input_field"
                        value={edit_value} onKeyPress={this.edited}
                    /></li>
                        
                    )
                    }
                </ul>
            </div>
        )
    }
}