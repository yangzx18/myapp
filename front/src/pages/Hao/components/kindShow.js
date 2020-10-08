import React from 'react'


function KindShow(props){
    // 点击请求数据 蓝色和黑色

    const handleClicked = ()=>{
        props.handleClicked()
        // window.open(props.url)
    }
    const s = props.isCurKind === "true" ? "kindshow curKind" : "kindshow"
    return (
        <span onClick={handleClicked} className={s} style={{position:'relative'}}>{props.name}</span>
    )
}

export default KindShow