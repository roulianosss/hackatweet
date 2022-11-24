import React from 'react'
import Image from 'next/image'
import styles from '../styles/Main.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Main() {
  return (
    <div className={styles.globalContainer}>
        <div className={styles.leftContainer}>
            <FontAwesomeIcon icon={faTwitter} className={styles.twitterIcon} />
            <div className={styles.cardUserContainer}>
            <div className={styles.userContainer}>
                <Image className={styles.userImage} width={50} height={50}  src='/assets/images/avatar.jpg'/>
                <div className={styles.textContainer}>
                    <h3>John</h3>
                    <p>@JohnCena</p>
                </div>
            </div>
            <div className={styles.logOutBtn}>LogOut</div>
            </div>
        </div>
        <div className={styles.centerContainer}>
            <div className={styles.headerContainer}>
                <h2>Home</h2>
                <div className={styles.inputBtnContainer}>
                    <input type="text" />
                    <div className={styles.counterBtnContainer}>
                        <p>0/180</p>
                        <div className={styles.tweetBtn}>Tweet</div>
                    </div>
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.tweet}>
                <div className={styles.tweetHeader}>
                    <Image className={styles.userImage} width={50} height={50} src='/assets/images/avatar.jpg'/>
                    <h3>John</h3>
                    <p>@JohnCena • few seconds ago.</p>
                </div>
                <p className={styles.tweetText}>Frist tweet test #twitter</p>
                <div className={styles.btnsContainer}>
                    <FontAwesomeIcon icon={faHeart} className={styles.tweetIcons} />
                    <FontAwesomeIcon icon={faTrash} className={styles.tweetIcons} />
                </div>
                </div>

            </div>
        </div>
        <div className={styles.rightContainer}>
            <h3>Trends</h3>
            <div className={styles.trendsContainer}>
                <div className={styles.hashtagContainer}>
                    <h4>#test</h4>
                    <p>2 tweet</p>
                </div>
                <div className={styles.hashtagContainer}>
                    <h4>#test2</h4>
                    <p>4 tweet</p>
                </div>
                <div className={styles.hashtagContainer}>
                    <h4>#test3</h4>
                    <p>5 tweet</p>
                </div>
            </div>
        </div>
    </div>
  )
}
