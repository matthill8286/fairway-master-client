import { Link } from "react-router-dom";
import './Header.css'

import useStaggeredSlideInAnimation from "../../../hooks/useStaggeredAnimation";

const Header = () => {
    const links = [
        { id: 1, text: 'Home', url: '/' },
        { id: 2, text: 'Login', url: '/login' },
        { id: 3, text: 'Register', url: '/register' },
        { id: 4, text: "Forgot Password", url: "/forgot-password" },
        { id: 4, text: "Dashboard", url: "/protected" }
    ];

    const direction = 'left';
    const isLinksVisible = useStaggeredSlideInAnimation(links.length, 100);

    return (
        <header className="header">
            {links.map((link) => (
                <Link className={`links-container ${direction} ${isLinksVisible ? 'visible' : ''}`} key={link.id} to={link.url}>
                    {link.text}
                </Link>
            ))}
        </header>
    );
};

export default Header;