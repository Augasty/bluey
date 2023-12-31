import { Link, NavLink, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../../utils/singInWithGoogle";
import topchicken from "../../../../assets/topchicken.jpg"

import bluey from "../../../../assets/bluey.png";
import styles from "./Navbar.module.css"; // Import your CSS file

const SignedOutNavbar = () => {


  // going to homepage when logging in
  const history = useNavigate();
  const handleSignIn = () =>{
    signInWithGoogle()
    // console.log('signing in')
    history('/')// console.log('to the home')

  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={bluey} />
        <Link to="/">_bluey</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          <li onClick={handleSignIn} className={styles.navbarListItem}>
            Login with Google
          </li>
          <li className={styles.navbarListItem}>
            <NavLink to="/" className={`${styles.profile} ${styles.toggle}`}>
              <img src={topchicken} alt="User" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SignedOutNavbar;
