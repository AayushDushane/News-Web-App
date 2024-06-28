import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./NewsDescription.css"
import Recommend from './Recommend';
import Spinner from './Spinner';
import { AppContext } from '../server/AppContext';
import Footer from './Footer';

export default function NewsDescription() {

  const location = useLocation();
  const { title, defaultImgUrl, author, date, category, contentUrl } = location.state.data;

  const [articleContent, setArticleContent] = useState('');
  const{audioState , setAudioState , articleLoader , setArticleLoader}=useContext(AppContext);

  useEffect(() => {
    async function fetchContent() {
      try {
        const url = `http://localhost:5000/api/article?url=${contentUrl}`;
        setArticleLoader(true);
        const response = await fetch(url);
        const data = await response.json();
        setArticleLoader(false);
        setArticleContent(data.content);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchContent();
  }, [contentUrl]);

  const generateAudio = (text) => {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.5; 
    synthesis.speak(utterance);
    setAudioState('playing');
  };


  const stopAudio = () => {
    const synthesis = window.speechSynthesis;
    if (synthesis && synthesis.speaking) {
      synthesis.cancel();
    }
    setAudioState('paused');
  };

  return (
    <div>
      {articleLoader ? (<Spinner />) : (
        <div>
          <div className="container-fluid mt-5" style={{ width: '90%' }}>
            <div className="row">
              <div className="col-md-12 offset-md-0">
                <div className="card">
                  <div >
                    <h5 className="card-title text-center">{title}</h5>
                  </div>

                  <div className="image-section" >
                    <img src={defaultImgUrl} className="card-img-top img-fluid" alt={defaultImgUrl} />
                  </div>

                  <div className="card-body">
                  <div className="audio-controls">
                    <div className="audio-player">
                      {audioState === 'paused' ? (
                        <svg
                          onClick={() => generateAudio(articleContent)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="currentColor"
                          className="bi bi-play-circle"
                          viewBox="0 0 16 16"
                        >
                          <title>Play Audio</title>
                          <desc>Click to play audio</desc>
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7.447 5.105a.5.5 0 0 1 .552-.105L10.5 7.5a.5.5 0 0 1 0 1l-2.501 2.501a.5.5 0 0 1-.777-.416V8.5a.5.5 0 0 1-.5-.5v-.995a.5.5 0 0 1 .228-.416zM8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1z" />
                        </svg>
                      ) : (
                        <svg
                          onClick={stopAudio}
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="currentColor"
                          className="bi bi-pause-circle"
                          viewBox="0 0 16 16"
                        >
                          <title>Pause Audio</title>
                          <desc>Click to pause audio</desc>
                          <path fillRule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM6.5 5.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5zM9 5.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5z" />
                        </svg>
                      )}
                      <span className="control-text">{audioState === 'paused' ? 'Play Audio' : 'Pause Audio'}</span>
                    </div>
                  </div>

                    <p className="card-text">{articleContent}</p>
                    <p className="card-text"><small className="text-muted">{new Date(date).toGMTString()}</small></p>
                    <p className="card-text"><small className="text-muted">Published by {!author ? "Unknown" : author}</small></p>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="line">
            <div class="up-next">Up Next</div>
          </div>

          <Recommend category={category} />
          <Footer/>
        </div>
      )}
    </div>
  );
}



