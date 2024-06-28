import "./NewsItems.css"
import React, { useContext } from 'react';
import NewsDefault from './NewsDefault.png'
import { useNavigate  } from 'react-router-dom';
import { useState } from "react";
import { AppContext } from "../server/AppContext";

export default function NewsItems({ title, description, imgUrl, author, date, source , category , contentUrl }) {

    const [defaultImgUrl, setDefaultImgUrl] = useState(imgUrl);
    const {setAudioState}=useContext(AppContext);

    const handleImgError = () => {
        imgUrl=NewsDefault;
        setDefaultImgUrl(NewsDefault);
    };

    const navigate = useNavigate();

    function clickNavigate() {
        const synthesis = window.speechSynthesis;
        if (synthesis && synthesis.speaking) {
        synthesis.cancel();
        }
        setAudioState('paused');
        window.scrollTo(0, 0);
        navigate("/news-description", { state: { data: { title, description, defaultImgUrl, author, date, source , category , contentUrl } } });
    }
    
  
    return (
        <div>
            <div className="container my-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                <div className="row bg-white">
                    <div className="col-md-6 mb-2 mt-2" style={{width:"40%"}} >
                        <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
                            <img src={!defaultImgUrl?(NewsDefault):(defaultImgUrl)} onError={handleImgError} style={{ borderRadius: '8px' }} className="img-fluid" alt="news" />
                            {/* <img src={!imgUrl ? NewsDefault : imgUrl} classyName="img-fluid" alt="news" /> */}
                            <a href="/">
                                <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4" style={{width:"60%"}}>
                        <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">{source}</span>
                        <h4><strong>{title}</strong></h4>
                        <p className="text-muted">{description}</p>
                        <p className="card-text"><small className="text-muted">Published by {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <button onClick={clickNavigate} className="btn btn-dark">Read more</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



