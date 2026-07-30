import { useState } from "react";
import API from "../api/axios";


function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = async(e)=>{

        e.preventDefault();


        try{


            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );


            console.log(response.data);


            // Save JWT Token

            localStorage.setItem(
                "token",
                response.data.token
            );


            // Save User Details Including Role

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );


            alert("Login Successful");


            window.location.href="/dashboard";


        }

        catch(error){


            console.log(error);


            alert(
                error.response?.data?.message ||
                "Login Failed"
            );


        }


    };


    return(

        <div>


            <h1>
                FinWise AI Login
            </h1>


            <form onSubmit={handleLogin}>


                <input

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e)=>
                    setEmail(e.target.value)
                }

                required

                />


                <br/>


                <input

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e)=>
                    setPassword(e.target.value)
                }

                required

                />


                <br/>


                <button type="submit">

                    Login

                </button>


            </form>


        </div>

    );

}


export default Login;