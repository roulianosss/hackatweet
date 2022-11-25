import React, { useEffect, useState } from 'react'
import Tweet from './Tweet'
import Image from 'next/image'
import styles from '../styles/Main.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import Hashtag from './Hashtag';
import { logout } from '../reducers/user'

export default function Main() {
    
  const dispatch = useDispatch()  
  const user = useSelector(state => state.user.value)

  const [tweetText, setTweetText] = useState('')

  const [allTweets, setAllTweets] = useState([])
  const [allHashtags, setAllHashtags] = useState([])

  useEffect(() => {
    fetchAllTweet()
    fetchAllHashtags()
  }, [])


  const fetchAllTweet = async() =>  {
    const response = await fetch('http://localhost:3000/tweets/allTweets')
    const data = await response.json()
    setAllTweets(data)
  }

  const fetchAllHashtags = async() =>  {
    const response = await fetch('http://localhost:3000/tweets/allHashtags')
    const data = await response.json()
    setAllHashtags(data)
  }

  const handleNewTweet = () => {
    fetch('http://localhost:3000/tweets/newTweet', {
			method: 'POST',
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId: user.userId, text: tweetText }),
		}).then(response => response.json())
			.then(data => {
                setAllTweets([...allTweets, data])
                fetchAllTweet()
                fetchAllHashtags()
			});
  }
  
  const tweetsToComponents = allTweets.map(tweet => <Tweet {...tweet} fetchAllHashtag = {()=> fetchAllHashtags()} fetchAllTweet={()=> fetchAllTweet()}/>)

  const hashtagsToComponents = allHashtags.map(hashtag => <Hashtag {...hashtag}/>)

    
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
                    <textarea type="text" onChange={(e) => setTweetText(e.target.value)} value={tweetText} maxlength="180"/>
                    <div className={styles.counterBtnContainer}>
                        <p>{tweetText.length}/180</p>
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
                {hashtagsToComponents}
            </div>
        </div>
    </div>
  )
}
