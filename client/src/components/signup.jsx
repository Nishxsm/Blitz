import { useState } from "react";


export default function signup(){
    const [form,setForm]=useState({name:"",email:"",password:""});
    const [error,setError]=useState("");
    const [success,setSuccess]=useState(false);

    function handlechange(e){
        setForm({...form,[e.target.name]:e.target.value });
    }

    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        setSuccess(false);

        const res=await fetch("http://localhost:4000/api/auth/signup",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form)
        });

        const data=await res.json();
        if(!res.ok)setError(data.message || "Singup failed.");
        else setSuccess(true);
    }

    return(
        <div className="auth-page">
            <h2>Sign-Up</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={form.name} onChange={handlechange} required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handlechange} required />
            </form>
        </div>
    )
}