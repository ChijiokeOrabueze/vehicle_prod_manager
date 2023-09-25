import styled from "styled-components"
import Input from "../components/Input"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { notify } from "../utils"
import { User } from "../types"
import { FormBody, Title } from "../styles"


const Container = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap:24px;

`



const Button = styled.div`

    background: #6576ff;
    border-radius: 3px;
    color: white;
    width: 100px;
    height: 36px;
    padding: 8px 18px;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    border: 0;

`

interface LoginProps {
    setUser: (user: User) => void;
}


const Login = ({setUser}: LoginProps) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!username || !password){
            notify("username and password is required.")
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_MAIN_API_URL}/auth/login`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                username,
                password
            })
        });

        const user = await response.json();

        if (response.ok){
            console.log(user)
            setUser({
                username: user.data.username,
                userType: user.data.user_type?.toLowerCase() == "admin" ? "ADMIN" : "REGULAR"
            });
            navigate("/home");
            return;
        }

        notify(user.message)

    }
  return (
    <Container>
        <Title>Enter Your Credentials to Login to Your Xpak Account</Title>
        <FormBody>
            <Input 
                name="username"
                title="username"
                type="text"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
            />
            <Input 
                name="password"
                title="password"
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
            />
        </FormBody>
        <Button onClick={handleSubmit}>Login</Button>

    </Container>
  )
}

export default Login