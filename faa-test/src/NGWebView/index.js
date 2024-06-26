import { useEffect, useRef, useState } from "react";

import NG_COMPONENT_ID from "../const/NG_COMPONENT_ID";

export default function NGWebView(props) {
    const resourcesMounted = useRef(false);

    const [ moduleInitialized, setModuleInitialized ] = useState(false);

    useEffect(() => {
        if (!resourcesMounted.current) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "/main.css";
        
            document.body.appendChild(link);
        
            const script = document.createElement("script");
            script.src = "/main.js";
            script.async = true;
        
            document.body.appendChild(script);

            window.addEventListener("message", handleWindowMessage);
        
            resourcesMounted.current = true;
        }
    }, []); // eslint-disable-line

    return (
        <>
            <div id={NG_COMPONENT_ID} style={{ display: 'flex', height: '40%', position: 'relative', width: '50%' }} />
            {moduleInitialized && <div>Now you can use module</div>}
        </>
    )

    function handleWindowMessage({ data }) {
        if (data?.source === NG_COMPONENT_ID) {
            window.NGAviationMapViewer.initialize({
                enabledNotamCreation: true,
                adsUri: "http://localhost:5160",
                workflowUri: "",
                mapboxAccessToken: ""
            });
            
            setModuleInitialized(true);

            window.removeEventListener("message", handleWindowMessage);
        }
    }
}