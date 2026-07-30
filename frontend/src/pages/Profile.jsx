import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        profileImage: ""
    });

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await API.get("/profile");
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            await API.put("/profile", {
                name: user.name,
                profileImage: user.profileImage
            });

            alert("Profile Updated Successfully ✅");
        } catch (err) {
            console.log(err);
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();

        try {
            await API.put("/profile/change-password", password);

            alert("Password Changed Successfully 🔒");

            setPassword({
                oldPassword: "",
                newPassword: ""
            });

        } catch (err) {
            alert(err.response?.data?.message || "Password Change Failed");
        }
    };

    return (
        <div className="profile-page">

            <h1>👤 My Profile</h1>

            <form
                className="profile-card"
                onSubmit={updateProfile}
            >

                <label>Name</label>

                <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                        setUser({
                            ...user,
                            name: e.target.value
                        })
                    }
                />

                <label>Email</label>

                <input
                    type="email"
                    value={user.email}
                    disabled
                />

                <label>Profile Image URL</label>

                <input
                    type="text"
                    value={user.profileImage}
                    onChange={(e) =>
                        setUser({
                            ...user,
                            profileImage: e.target.value
                        })
                    }
                />

                <button type="submit">
                    Save Profile
                </button>

            </form>

            <form
                className="profile-card"
                onSubmit={changePassword}
            >

                <h2>🔐 Change Password</h2>

                <input
                    type="password"
                    placeholder="Old Password"
                    value={password.oldPassword}
                    onChange={(e) =>
                        setPassword({
                            ...password,
                            oldPassword: e.target.value
                        })
                    }
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={password.newPassword}
                    onChange={(e) =>
                        setPassword({
                            ...password,
                            newPassword: e.target.value
                        })
                    }
                />

                <button type="submit">
                    Change Password
                </button>

            </form>

        </div>
    );
}

export default Profile;