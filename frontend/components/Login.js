import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function Login() {

  const [signUpModal, setSignUpModal] = useState(false)
  const [signInModal, setSignInModal] = useState(false)
  
  const handleSignUp = () => {
    signInModal && setSigInModal(false)
    setSignUpModal(true)
  }

  const handleSignIn = () => {
    signUpModal && setSigUpModal(false)
    setSignInModal(true)
  }

  const signUpModalContent = (
    <div className={styles.modalContainer}>
        <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} onClick={() => setSignUpModal(false)}/>
        <FontAwesomeIcon icon={faTwitter} className={styles.twitterIcon} />
        <h2>Create your Hackatweet account</h2>
        <input type="text" placeholder='Firstname'/>
        <input type="text" placeholder='Username'/>
        <input type="password" placeholder='Password'/>
        <div className={styles.signUpModalBtn}>Sign up</div>
    </div>
  )

  const signInModalContent = (
    <div className={styles.modalContainer}>
        <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} onClick={() => setSignInModal(false)}/>
        <FontAwesomeIcon icon={faTwitter} className={styles.twitterIcon} />
        <h2>Log in to your Hackatweet account</h2>
        <input type="text" placeholder='Username'/>
        <input type="password" placeholder='Password'/>
        <div className={styles.signUpModalBtn}>Sign In</div>
    </div>
  )



  return (
    <div className={styles.globalContainer}>
        {signUpModal && signUpModalContent}
        {signInModal && signInModalContent}
        <div className={styles.imageContainer}></div>
        <div className={styles.textContainer}>
            <FontAwesomeIcon icon={faTwitter} className={styles.twitterIcon} />
            <h2>See what's <br/>happening</h2>
            <h4>Join Hackatweet today</h4>
            <div className={styles.signUpBtn} onClick={() => handleSignUp()}>Sign up</div>
            <p>Already have an account?</p>
            <div className={styles.signUpBtn} onClick={() => handleSignIn()}>Sign in</div>
				
        </div>
    </div>
  )
}
