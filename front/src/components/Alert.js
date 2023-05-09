import React from 'react'

export default function Alert(props) {

    let displayAlert
    if (props.alert !== null) {
        return (
            <>
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} style={{height: '60px', margin: '0', boxSizing: 'border-box'}} role="alert">
                   <strong> {props.alert.msg} </strong> 
                </div>
            </>
        )
    } else {
        return (
            <>
            <div style={{height: '60px'}}>
            </div>
            </>
        )
    }
}