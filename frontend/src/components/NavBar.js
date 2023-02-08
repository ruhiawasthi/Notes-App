import axios from '../Api.js';
import { useNavigate } from 'react-router-dom';

export default function NavBar(props) {
    const navigate = useNavigate();
    function logoutPage (e){
        e.preventDefault();
        axios.get('/logout', {withCredentials:true}).then(
           (response) => {
               if (response.status === 200) {
                 document.cookie = "authToken=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
                   navigate('/login');
               }  
               })
               .catch((err) => {
                 alert("Check again");
               });
    }
    return (
        <header>
            <nav>
                <ul>
                    <li>

                        <a href="#"> Home </a>
                    </li>
                    <li>
                        <a href="#"> About </a>
                    </li>
                    <li>
                        <a href="/"> All Notes </a>
                    </li>
                    <li> 
                        <a href="/login"> login </a>
                    </li>
                    <li> 
                        <a href="/signup"> Signup </a>
                    </li>                 
                    <li> 
                        <a onClick={logoutPage} href="/logout"> Logout</a>
                    </li> 
                </ul>
            </nav>
        </header>
    );

}