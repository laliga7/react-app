import React from 'react';
import "../css/signin.css"
import "../css/Loginstyle.css"

import { findUser } from '../functions/login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import profile from '../assets/profile.jpg'

function Login() {

    let navigate = useNavigate();
    const [user, setUser] = useState({ 
        title: '', 
        content:''
    });

    
    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        // clear();
    }
    
    const fetchUser = async(id) =>{
        if (user.title === '') {
            console.log("check for missing values before you submit")
            alert("check for missing values before you submit");
            //   window.location.reload(false);
            //   clear();
        } else{
            try {
                const result1 = await findUser(id);
                if (result1[0].email === user.title && result1[0].password === user.content) {
                    console.table(result1)
                    console.log(result1[0].fullName)
                    if (result1[0].systemRole === "Admin") {
                        navigate("/adminPage")
                    } else{
                        if (result1[0].systemRole === "Technician") {
                            
                            navigate("/userPage")
                        }
                    }
                    // clear();
                } else {
                    console.log("Hmm, we can't seem to recognise you. Please double check your email and password are correct.")  
                    alert("Hmm, we can't seem to recognise you. Please double check your email and password are correct.");
                    window.location.reload(false);
                    // clear();  
                }
            } catch (error) {
                console.log("Hmm, we can't seem to recognise you. Please double check your email and password are correct.")
                alert("Hmm, we can't seem to recognise you. Please double check your email and password are correct.");
                window.location.reload(false);
                // clear();
                // console.log(error)
            }
        }
    }

    // const 
    return (
        
        // <main className="form-signin">
        //     <div className='bodybody'>
        //         <form className='signin' onSubmit={onSubmitHandler}>
        //             <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        //             <div className="form-floating">
        //             <input onChange={e=> setUser({...user,title:e.target.value})} type="text" className="form-control" id="floatingInput" placeholder="title" />
        //             <label htmlFor="floatingInput">Title</label>
        //             </div>
        //             <div className="form-floating">
        //             <input onChange={e=> setUser({...user,content:e.target.value})} type="text" className="form-control" id="floatingPassword" placeholder="Content" />
        //             <label htmlFor="floatingPassword">Content</label>
        //             </div>
        //             <button onClick={() => fetchUser(user.title)} className="w-100 btn btn-lg btn-primary">Sign in</button>
        //         </form>
        //     </div>
        // </main>

        <header>
            <div className="loginbox">
                <img src={profile} className="profile" alt="background_image"/>
                <h1 style={{color: '#fff'}}>Login Here</h1>
                <form onSubmit={onSubmitHandler}>
                    <span>Username</span>
                    <input onChange={e=> setUser({...user,title:e.target.value})} id="userNameInp" type="text" name="userName" placeholder="Enter Username" />
                    <span>Password</span>
                    <input onChange={e=> setUser({...user,content:e.target.value})} id="passwordInp" type="password" name="password" placeholder="Enter Password" />
                    {/* <br /> */}
                    <button id="loginBtn" onClick={() => fetchUser(user.title)}>Login</button>
                {/*-----addd  ---------*/}
                <br />
                </form>
            </div>
        </header>

    );
}


export default Login;
