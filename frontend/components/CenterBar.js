import React, { useState } from 'react'
import styles from '../styles/CenterBar.module.css'

export default function CenterBar({tweetsToComponents, handleNewTweet}) {
   
    const [tweetContent, setTweetContent] = useState('')


  return (
    <div className={styles.centerContainer}>
        <div className={styles.headerContainer}>
            <h2>Home</h2>
            <div className={styles.inputBtnContainer}>
                <textarea type="text" onChange={(e) => setTweetContent(e.target.value)} value={tweetContent} maxLength="180"/>
                <div className={styles.counterBtnContainer}>
                    <p>{tweetContent.length}/180</p>
                    <div className={styles.tweetBtn} onClick={() => handleNewTweet(tweetContent)}>Tweet</div>
                </div>
            </div>
        </div>
        <div className={styles.contentContainer}>
            {tweetsToComponents}
        </div>
    </div>
  )
}
