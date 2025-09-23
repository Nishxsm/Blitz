import { Link } from "react-router-dom";
import "../styles/landingpage.css";

export default function landingpage(){
    return(
        <div className="landing-bg">
        <header className="landing-header">
        <div className="logo">BLITZ</div>
        <nav>
            <Link to="/signup" className="nav-btn"> SIGN-UP</Link>
            <Link to="/login" className="nav-btn"> LOGIN</Link>
        </nav>
        </header>
        <main className="landing-main">
            <h1 className="landing-title">
                THE FUTURE OF SHOPPING STARTS HERE!!
            </h1>
            <p className="landing-desc">
                Discover top products,unbeatable deals,<br />
                and a seamless shopping experience,<br />
                all in one place.
            </p>
            <Link to="/signup" className="get-started-btn">GET-STARTED</Link>
        </main>
        </div>
    );
}