import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// created use context
const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [userdata, setUserData] = useState();
    const [socket, setSocket] = useState(null)
    const [onlineusers, setonlineusers] = useState([])

    const id = localStorage.getItem("userid");
    const role = localStorage.getItem("Role");
    // console.log(id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/GetUserDataById`,{id,role});
                setUserData(res.data);
            } catch (err) {
                console.log("Error fetching user data:", err);
            }
        };
        fetchData()
    }, [id])

    useEffect(() => {
        const fetchData =  () => {
            if (userdata) {
                    // const socket = io(`http://localhost:3000`, {
                    const socket = io(`https://s47-aniket-capstone-buildvision.onrender.com`, {
                        query: {
                            userid: userdata._id
                        }
                    });

                    setSocket(socket);

                    // Listening to the "getonlineusers" event
                    socket.on("getonlineusers", (onlineUserIds) => {
                        // Update the online users state with all online user IDs
                        setonlineusers(onlineUserIds);
                        // console.log(onlineusers); // Note: onlineusers may not be updated immediately after calling setonlineusers due to closure.
                    });

                    socket.on('receiveMessage', ({ senderId, message }) => {
                        // Add the message to the chat UI
                        addMessageToChat(senderId, message);
                    });

                    return () => socket.close();
            }

            else if (socket) {
                socket.close()
                setSocket(null)
            }
        }
        fetchData();
    }, [userdata,]);

    return <SocketContext.Provider value={{ socket, onlineusers }}>{children}</SocketContext.Provider>
}
