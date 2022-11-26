import React, { useEffect, useState } from 'react'
import Tweet from './Tweet'
import Image from 'next/image'
import Hashtag from './Hashtag';
import styles from '../styles/Main.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/user'
import { v4 as uuidv4 } from 'uuid';


export default function Main() {
    
  const dispatch = useDispatch()  
  const user = useSelector(state => state.user.value)

  const [tweetContent, setTweetContent] = useState('')

  const [allTweets, setAllTweets] = useState([])
  const [allHashtags, setAllHashtags] = useState([])

  useEffect(() => {
    fetchAllTweet()
    fetchAllHashtags()
  }, [])


  const fetchAllTweet = async() =>  {
    const response = await fetch('http://localhost:3000/tweets/allTweets')
    const allTweets = await response.json()
    setAllTweets(allTweets)
  }

  const fetchAllHashtags = async() =>  {
    const response = await fetch('http://localhost:3000/hashtags/allHashtags')
    const allHashtags = await response.json()
    setAllHashtags(allHashtags)
  }
  
  const fetchByUsername = async(username) =>  {
    const response = await fetch('http://localhost:3000/tweets/allTweets')
    const allTweets = await response.json()
    const tweetsByUsername = allTweets.filter(tweet => tweet.author.username === username)
    setAllTweets(tweetsByUsername)
  }

  const fetchByHashtag = async(hashtagName) =>  {
    const response = await fetch('http://localhost:3000/tweets/allTweets')
    const allTweets = await response.json()
    const tweetsByHashtag = allTweets.filter(tweet => tweet.hashtags.some(el => el.hashtagName == hashtagName))
    setAllTweets(tweetsByHashtag)
  }

  const handleNewTweet = () => {
    fetch('http://localhost:3000/tweets/newTweet', {
			method: 'POST',
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId: user.userId, tweetContent: tweetContent }),
		}).then(response => response.json())
			.then(newTweet => {
                setAllTweets([...allTweets, newTweet])
                fetchAllTweet()
                fetchAllHashtags()
			});
  }

  const tweetsToComponents = allTweets.map(tweet => <Tweet key={uuidv4()} {...tweet} fetchAllHashtag = {()=> fetchAllHashtags()} fetchAllTweet={()=> fetchAllTweet()} fetchByUsername={fetchByUsername} fetchByHashtag={fetchByHashtag}/>)

  const hashtagsToComponents = allHashtags.sort((a,b) => (b.hashtagInTweetsCount > a.hashtagInTweetsCount) ? 1 : ((a.hashtagInTweetsCount > b.hashtagInTweetsCount) ? -1 : 0)).filter((el,i) => el.hashtagInTweetsCount > 0 && i<5).map(hashtag => <Hashtag key={uuidv4()} {...hashtag} fetchByHashtag={fetchByHashtag}/>)

  return (
    <div className={styles.globalContainer}>
        <div className={styles.leftContainer}>
            <FontAwesomeIcon icon={faTwitter} className={styles.twitterIcon} onClick={()=>fetchAllTweet()} style={{cursor: 'pointer'}}/>
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
        <div className={styles.centerContainer}>
            <div className={styles.headerContainer}>
                <h2>Home</h2>
                <div className={styles.inputBtnContainer}>
                    <textarea type="text" onChange={(e) => setTweetContent(e.target.value)} value={tweetContent} maxLength="180"/>
                    <div className={styles.counterBtnContainer}>
                        <p>{tweetContent.length}/180</p>
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
