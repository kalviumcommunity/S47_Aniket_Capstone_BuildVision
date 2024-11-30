import React, { useEffect, useRef, useState } from 'react';
import Chatting from "./Zustand/Zustand";
import css from '../../css/chat.module.css';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useSocketContext } from './Context/socketcontext';
import { formatDistanceToNow } from 'date-fns';
import navcss from '../../css/Navigation.module.css'
import NavigationBar from '../NavigationBar.jsx'
import { useAuth0 } from '@auth0/auth0-react'


function Chat() {
    const [userdata, setUserData] = useState([]);
    const [error, setError] = useState(false)
    const [msg, setmsg] = useState("");
    const { conversation, setConversation } = Chatting();
    const { message, setMessage } = Chatting();
    const [search, setSearch] = useState("");
    const [conversationerror, setconversationerror] = useState("");
    const { onlineusers, socket } = useSocketContext();
    const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0()
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [IsLoading, setIsLoading] = useState(false);


    const Email = localStorage.getItem("Email");
    const userRole = localStorage.getItem("Role");
    const id = localStorage.getItem("userid");

    const lastMessageRef = useRef();

    // Auto-scroll to the last message
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [message]);

    // Fetch chat users based on user role
    useEffect(() => {
        setIsLoading(true)
        const getdata = async () => {
            const token = isAuthenticated ? await getAccessTokenSilently() : localStorage.getItem("Token")
            setIsLoading(true)
            // console.log(isAuthenticated, token)
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/${userRole === "Architect" ? "GetClientData" : "GetArchiData"}`, {
                headers: {
                    "Content-Type": "text",
                    "Authorization": token
                }
            })
                .then((res) => {
                    setUserData(res.data)
                    setIsLoading(false)
                    // console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    setError(true)
                    setIsLoading(false)
                })
        }
        getdata()
    }, [])
    // console.log(userdata)

    // Handle sending a message
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (conversation) {
                const recieverid = conversation._id;
                if (msg === "") return;

                await axios.post(`${import.meta.env.VITE_SERVER_URL}/SendMessage/${recieverid}`, { senderid: localStorage.getItem("userid"), msg })
                    .then((res) => {
                        setMessage([...message, res.data]);
                    });
                setmsg(""); // Clear input after sending
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch messages for selected conversation
    useEffect(() => {

        if (conversation) {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/${conversation._id}`, { params: { senderid: id } })
                .then((res) => {
                    setconversationerror(null);
                    setMessage(res.data);
                })
                .catch((err) => {
                    console.log(err)
                    setMessage([]);
                    setconversationerror(err);
                });
        }
    }, [conversation]);

    // Update message input
    const handleSend = (e) => {
        setmsg(e.target.value);
    };

    // Listen for incoming messages
    const useListenMessages = () => {
        useEffect(() => {
            socket?.on("newMessage", (newMessage) => {
                setMessage([...message, newMessage]);
            });
            return () => {
                socket?.off("newMessage");
            };
        }, [socket, setMessage, message]);
    };
    useListenMessages();

    // Filter chats based on user role
    const filteredUsers = userdata
        .filter(user => {
            const name = user.Role?.toLowerCase() === "client"
                ? user.ClientName || ""
                : user.ArchitectName || "";
            return name.toLowerCase().includes(search.toLowerCase());
        }
        );
    const handleConversationClick = (data) => {
        setConversation(data)
        setSelectedUserId(data._id);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e); // Trigger the send message functionality
        }
    };

    // console.log(conversation)

    if (error) {
        return (
            <h1>Please Login ....</h1>
        )
    }
    if (isLoading || IsLoading) {
        return (
            <h1>Loading ....</h1>
        )
    }
    if (!error) {
        return (
            <div className={navcss.navbar}>
                <NavigationBar />
                <div className={css.head}>
                    <div className={css.chatmembers}>
                        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="search" value={search} className={css.searchtext} />
                        {filteredUsers
                            .map((data) => (
                                <div key={data._id}>
                                    <h2 onClick={() => handleConversationClick(data)} style={{
                                        cursor: "pointer",
                                        backgroundColor: selectedUserId === data._id ? "#d0ebff" : "#f9f9f9",
                                        color: selectedUserId === data._id ? "#007bff" : "#000",
                                        borderLeft: selectedUserId === data._id ? "4px solid #007bff" : "none",
                                    }} className={css.userhead}>{userRole === "Client" ? data.ArchitectName : data.ClientName}</h2>
                                    <span>{onlineusers.includes(data._id) ? "online" : "offline"}</span>
                                </div>
                            ))}
                    </div>
                    <div className={css.chatarea}>
                        <h2 className={css.chatholder}>{conversation ? conversation.ClientName || conversation.ArchitectName : "Chat with someone"}</h2>
                        <div className={css.messagearea}>
                            {conversationerror && <p>{`${conversationerror.response.data.error} with ${conversation.ClientName || conversation.ArchitectName}`}</p>}
                            {message && message.map((data) => (
                                <div key={data._id} ref={lastMessageRef}>
                                    <div style={{ textAlign: data.senderid === localStorage.getItem("userid") ? "right" : "left" }} className={css.message}>
                                        <p className={css.messagetext}>{data.message}</p>
                                        <p className={css.time}>{formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}</p>
                                    </div>
                                    <br />
                                </div>
                            ))}
                        </div>
                        <div className={css.messagetypearea}>
                            <input type="text" value={msg} onChange={(e) => handleSend(e)} className={css.messagetext} onKeyDown={(e) => handleKeyDown(e)} required />
                            <button onClick={(e) => handleSubmit(e)} className={css.button} type='submit'>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
