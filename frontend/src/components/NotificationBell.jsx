import { Link } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

import "./NotificationBell.css";

function NotificationBell() {

    const { notifications } = useNotifications();

    const unread = notifications.filter(
        n => !n.isRead
    ).length;

    return (

        <Link
            to="/notifications"
            className="notification-bell"
        >

            🔔

            {unread > 0 && (

                <span className="notification-badge">

                    {unread}

                </span>

            )}

        </Link>

    );

}

export default NotificationBell;