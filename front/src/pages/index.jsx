import React, { Component,Suspense } from 'react'
import { Route, Switch,HashRouter } from 'react-router-dom'
import Layouts from './Layouts'


class Routers extends Component{
    render(){
        return (
            <HashRouter>
            <Switch>
                {/* <Suspense fallback={<div>loading</div>}> */}
                    <Route path='/' component={Layouts}/>
                {/* </Suspense> */}
                    
            </Switch>
            </HashRouter>
        )
    }
}

export default Routers