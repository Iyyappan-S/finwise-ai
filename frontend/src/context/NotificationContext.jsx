import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);

    const loadNotifications = async () => {

        try {

            const res = await API.get("/notifications");

            setNotifications(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadNotifications();

    }, []);

    return (

        <NotificationContext.Provider
            value={{
                notifications,
                loadNotifications
            }}
        >

            {children}

        </NotificationContext.Provider>

    );

};

export const useNotifications = () =>
    useContext(NotificationContext);