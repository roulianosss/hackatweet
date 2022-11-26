import React from 'react'
import Image from 'next/image'
import styles from '../styles/LeftSideBar.module.css'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function LeftSideBar({user, refreshAllData}) {

  const dispatch = useDispatch()

  return (
    <div className={styles.leftContainer}>
        <FontAwesomeIcon icon={faTwitter} className={styles.twitterIcon} onClick={()=>refreshAllData()} style={{cursor: 'pointer'}}/>
        <div className={styles.cardUserContainer}>
            <div className={styles.userContainer}>
                <Image alt='avatar' className={styles.userImage} width={50} height={50} src='/assets/images/avatar.jpg'/>
                <div className={styles.textContainer}>
                    <h3>{user.firstname}</h3>
                    <p>@{user.username}</p>
                </div>
            </div>
            <div className={styles.logOutBtn} onClick={() => dispatch(logout())}>LogOut</div>
        </div>
    </div>
  )
}
