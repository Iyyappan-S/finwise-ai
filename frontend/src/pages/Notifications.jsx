import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Notifications.css";
import { useNotifications } from "../context/NotificationContext";

function Notifications() {

const {

    notifications,

    loadNotifications

} = useNotifications();
    useEffect(() => {
        loadNotifications();
    }, []);

    

    const markAsRead = async (id) => {

        try {

            await API.put(`/notifications/${id}/read`);

            loadNotifications();

        } catch (err) {

            console.log(err);

        }

    };

    const markAllRead = async () => {

        try {

            await API.put("/notifications/read-all");

            loadNotifications();

        } catch (err) {

            console.log(err);

        }

    };

    const deleteNotification = async (id) => {

        if (!window.confirm("Delete this notification?"))
            return;

        try {

            await API.delete(`/notifications/${id}`);

            loadNotifications();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="notifications-page">

            <div className="notifications-header">

                <h1>🔔 Notifications</h1>

                <button
                    className="read-all-btn"
                    onClick={markAllRead}
                >
                    Mark All Read
                </button>

            </div>

            {notifications.length === 0 ? (

                <p>No Notifications Yet.</p>

            ) : (

                notifications.map((notification) => (

                    <div
                        key={notification._id}
                        className={`notification-card ${
                            notification.isRead
                                ? "read"
                                : "unread"
                        }`}
                    >

                        <div>

                            <h3>
                                {notification.title}
                            </h3>

                            <p>
                                {notification.message}
                            </p>

                            <small>
                                {new Date(
                                    notification.createdAt
                                ).toLocaleString()}
                            </small>

                        </div>

                        <div className="notification-actions">

                            {!notification.isRead && (

                                <button
                                    onClick={() =>
                                        markAsRead(
                                            notification._id
                                        )
                                    }
                                >
                                    ✔ Read
                                </button>

                            )}

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    deleteNotification(
                                        notification._id
                                    )
                                }
                            >
                                🗑
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default Notifications;