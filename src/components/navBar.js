import '../css/navBar.css'
import Logo from '../assets/Broad1.png'

const NavBar = () => {
    return ( 
        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                    <img src={Logo} alt="company_Logo" width={170}/>
                </div>
            </div>
            <div className="nav-btn">
                <label htmlFor="nav-check">
                <span />
                <span />
                <span />
                </label>
            </div>
            <div className="nav-links">
                <a href="#!" >Home</a>
                <a href="#!" >Profile</a>
                <a href="#!" >Tasks</a>
                <a href="#!" >Job Card</a>
            </div>
        </div>

     );
}

export default NavBar;