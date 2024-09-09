import React,{ useEffect, useState } from "react";

function Notification({warning,setWarning}) {
    const [displayWarning,setDisplayWarning] = useState([]);
    useEffect(() => {
        if(warning) {
            if(Array.isArray(warning) && warning.length > 0) {
                let tempWarning = [];
                for(let i = 0;i < warning.length;i++) {
                    tempWarning.push(warning[i]);
                }
                setDisplayWarning(tempWarning);
            }
            else{
                setDisplayWarning([warning]);
            }
            setTimeout(() => {
                setWarning();
                setDisplayWarning([]);
            },5000)
        }
    },[warning])

    if(warning) {
        return (
            <div className="notification">
                <div>
                    {displayWarning.map((warn) => <div>{warn}</div>)}
                </div>
                <div className="pointer" onClick={() => (setWarning())}>
                    X
                </div>
            </div>
        )
    }
}

export default Notification;