import React, { useEffect, useState } from 'react'
import Tweet from './Tweet'
import Image from 'next/image'
import styles from '../styles/Main.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/user'

export default function Main() {
    
  const dispatch = useDispatch()  
  const user = useSelector(state => state.user.value)

  const [tweetText, setTweetText] = useState('')

  const [allTweets, setAllTweets] = useState([])

  useEffect(() => {
    fetchAllTweet()
  }, [])


  const fetchAllTweet = async() =>  {
    const response = await fetch('http://localhost:3000/tweets/allTweets')
    const data = await response.json()
    setAllTweets(data)
  }

  const handleNewTweet = () => {
    fetch('http://localhost:3000/tweets/newTweet', {
			method: 'POST',
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId: user.userId, text: tweetText }),
		}).then(response => response.json())
			.then(data => {
                setAllTweets([...allTweets, data])
			});
    fetchAllTweet()
  }

  
  
  const tweetsToComponents = allTweets.map(tweet => <Tweet {...tweet} fetchAllTweet={()=> fetchAllTweet()}/>)

  console.log(allTweets)

    
  return (
    <div className={styles.globalContainer}>
        <div className={styles.leftContainer}>
            <FontAwesomeIcon icon={faTwitter} className={styles.twitterIcon} />
            <div className={styles.cardUserContainer}>
            <div className={styles.userContainer}>
                <Image className={styles.userImage} width={50} height={50} src='/assets/images/avatar.jpg'/>
                <div className={styles.textContainer}>
                    <h3>{user.firstname}</h3>
                    <p>@{user.username}</p>
                </div>
            </div>
            <div className={styles.logOutBtn} onClick={() => dispatch(logout())}>LogOut</div>
            </div>
        </div>
        <div className={styles.centerContainer}>
            <div className={styles.headerContainer}>
                <h2>Home</h2>
                <div className={styles.inputBtnContainer}>
                    <input type="text" onChange={(e) => setTweetText(e.target.value)} value={tweetText}/>
                    <div className={styles.counterBtnContainer}>
                        <p>0/180</p>
                        <div className={styles.tweetBtn} onClick={() => handleNewTweet()}>Tweet</div>
                    </div>
                </div>
            </div>
            <div className={styles.contentContainer}>
                {tweetsToComponents}

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
