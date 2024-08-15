import React,{ useEffect } from "react";

function Notification({warning,setWarning}) {
    useEffect(() => {
        if(warning) {
            setTimeout(() => {
                setWarning();
            },5000)
        }
    },[warning])

    if(warning) {
        return (
            <div className="notification">
                <div>
                    {warning}
                </div>
                <div className="pointer" onClick={() => (setWarning())}>
                    X
                </div>
            </div>
        )
    }
}

export default Notification;