import { Link } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

import "./NotificationDropdown.css";

function NotificationDropdown() {

    const { notifications } = useNotifications();

    return (

        <div className="notification-dropdown">

            <h3>Recent Notifications</h3>

            {notifications
                .slice(0,5)
                .map(notification => (

                    <div
                        key={notification._id}
                        className="dropdown-item"
                    >

                        <strong>

                            {notification.title}

                        </strong>

                        <p>

                            {notification.message}

                        </p>

                    </div>

                ))}

            <Link to="/notifications">

                View All →

            </Link>

        </div>

    );

}

export default NotificationDropdown;