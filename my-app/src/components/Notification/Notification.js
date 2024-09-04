import React,{ useEffect, useState } from "react";

function Notification({warning,setWarning}) {
    const [displayWarning,setDisplayWarning] = useState();
    useEffect(() => {
        if(warning) {
            if(Array.isArray(warning) && warning.length > 0) {
                setDisplayWarning(warning[0]);
            }
            else{
                setDisplayWarning(warning);
            }
            setTimeout(() => {
                setWarning();
                setDisplayWarning();
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