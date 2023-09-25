import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import styled from 'styled-components';
import Home from './pages/Home';
import Login from './pages/Login';
import States from './pages/States';
import { useLocalStorage } from './hooks/useLocalStorage';


const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;

    * {
        box-sizing: border-box;
    }
`;

function App() {
    const [user, setUser] = useLocalStorage("user", {username: "", userType: "" as "REGULAR" | "ADMIN"});
    return (
        <Container>
            <>
                <Routes>
                    <Route path='/' element={<Login setUser={(user)=>{setUser(user)}} />} />
                    <Route path='/home' element={<Home user={user}/>} />
                    <Route path='/states' element={<States />} />
                    <Route path='*' element={<div>Not found</div>} />
                </Routes>
            </>
            <ToastContainer limit={1} />
        </Container>
    );
}

export default App;
