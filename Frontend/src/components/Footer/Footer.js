import './Footer.css';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'; 
import { FaFacebook } from 'react-icons/fa';

function Footer() {
    return (
        <footer>
            <div className="container">
                
                Todos los derechos reservados &copy; 2023 &#8226;
                <a href="https://kinal.academy" target="_blank" rel="noreferrer">KINAL</a>
            </div>
        </footer >
    )
}

export default Footer;

/*
target="_blank" rel="noreferrer"

<div className="connections">
                    <a href="/#" id="instaIcon"><AiFillInstagram /></a>
                    <a href="/#" id="fbIcon"><FaFacebook /></a>
                    <a href="/#" id="linkedIcon"><AiFillLinkedin /></a>
                    
                </div>

*/