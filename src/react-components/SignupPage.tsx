import '../styles/LoginPage.scss'
import { useState } from 'react'
import { emailInput, passwordInput } from './classes/PolymorphicEmailInput'





const SignupPage = () => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

   
    return (
        <>
            <div className='body'>
                
                <form>
                    <h3>Sign Up To Juniper</h3>

                    <label>Email</label>
                    <input 
                        id="email" 
                        value={email} 
                        placeholder="someone@example.com"
                        onChange={(e) => setEmail(e.target.value)}/>  

                    <label>Username</label>
                    <input 
                        id="username" 
                        value={username} 
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}/> 

                    <label>Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}/> 

                    <button
                    onClick={() => {

                        let emailInputBox = new emailInput(email)
                        let passwordInputBox = new passwordInput(password)

                        if (emailInputBox.verify() == true) {
                            if (passwordInputBox.verify() == true) {
                                fetch('18.191.173.196:8080/api/auth/signup', {
                                    method: "POST",
                                    headers: { 
                                        'Content-Type': 'application/json',
                                        'Access-Control-Allow-Origin': '*' 
                                    },
                                    body: JSON.stringify({
                                        email: email,
                                        username: username,
                                        password: password 
                                    })
                                }).then((response) => response.json())
                                .then((data) => {
                                    console.log(data)
                                    if (data.new_window == "false") {
                                        alert(data.text)
    
                                    } else if (data.new_window == "true") {
                                        window.open('/homepage','_blank', );
                                        localStorage.setItem('username', data.username)
                                    }
                                }) 
                            }
                        }
                    }}
                    type='button'
                    >Submit</button>

                    <div className='login-redirect'>
                        <a href="/login">Already Have An Account?</a>
                    </div>
                    
                </form>
            </div>
           
        </>
    )
}

export default SignupPage