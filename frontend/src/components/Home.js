import NavBar from './NavBar';
import Note from './Note';
import './Home.css';
import axios from '../Api.js';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

function Home() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));

    function getALLNotes() {
      
        axios.get('/newnote', {withCredentials:true})
        .then(
            (response) => {
                setNotes(response.data.results)
            }
        )
        .catch((err)=>
        {
            console.log(err);
            // navigate('/login')

        })     
    }

    useEffect(() => {
        getALLNotes()

    }, []);

   
    console.log(notes)

    const [show, setShow] = useState(true)
    const closeModal = () => {
        setShowModal(false);
      };


    function saveNote() {
        axios.post('/newnotePost', {
            description: description,
            title: title
        },)
            .then((response) => {
                  getALLNotes()
            });

        setShowModal(false);
    }
    return (
        <div className="App">
          <NavBar></NavBar>
    
          <div id="app">
            {notes.map((item) => {
              return <Note title={item.title} description={item.description} />;
            })}
    
            <button
              className="add-note"
              type="button"
              onClick={(e) => {
                setShowModal(true);
              }}
            >
              +
            </button>
    
            <div>
              {showModal ? (
                <div className="popup" show={showModal}>
                  <div className="popup-content">
                    <div className="row navstyle">
                      <h2 style={{ color: "#031218", margin: "10px" }}>
                        Create a new note
                      </h2>
                      {/* <AiFillCloseCircle style={{color: "#031218", margin: "10px"}} onClick={closeModal}/> */}
                    </div>
                    <div className="row">
                      <h4 style={{ color: "#031218", margin: "10px" }}>Title</h4>
                      <input
                        className="string-input"
                        style={{ margin: "10px" }}
                        placeholder="Note title here"
                        type="text"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <h4 style={{ color: "#031218", margin: "10px" }}>
                        Description
                      </h4>
                      <textarea
                        className="string-input"
                        style={{ margin: "10px" }}
                        placeholder="Note description here"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="row" style={{ justifyContent: "end" }}>
                      <button
                        style={{
                          padding: "5px 20px",
                          margin: "0 5px",
                          border: "none",
                          borderRadius: "10px",
                          color: "white",
                          background: "#031218",
                        }}
                        onClick={closeModal}
                      >
                        Discard
                      </button>
                      <button
                        style={{
                          padding: "5px 20px",
                          margin: "0 5px",
                          border: "none",
                          borderRadius: "10px",
                          color: "black",
                          background: "#00f3ed",
                        }}
                        onClick={saveNote}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }


export default Home;


