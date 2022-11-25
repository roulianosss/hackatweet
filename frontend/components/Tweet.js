import React from 'react'
import styles from '../styles/Main.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import timeSince  from '../modules/timeSince'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../reducers/user'


export default function Tweet(props) {
    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    
    const isOwner = props.user._id === user.userId 

    const handleDeleteTweet = async() => {
        const response = await fetch(`http://localhost:3000/tweets/deleteTweet/${props._id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log('deletetweet', data)
        props.fetchAllTweet()
        props.fetchAllHashtag()
    }

    const handleLikeTweet = async() => {
        if (user.likedTweets.includes(props._id)) return
        const res = await fetch(`http://localhost:3000/tweets/like`, {
			method: 'POST',
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({ tweetId: props._id, userId: user.userId }),
		})
        const data = await res.json()
        console.log(data);
        dispatch(login({ username: data.username, token: data.token, firstname: data.firstname, userId: data._id, likedTweets: data.likedTweets}))
        props.fetchAllTweet()

    }


  return (
    <div className={styles.tweet}>
        <div className={styles.tweetHeader}>
            <Image className={styles.userImage} width={50} height={50} src='/assets/images/avatar.jpg'/>
            <h3>{props.user.firstname}</h3>
            <p>@{props.user.username} • {timeSince(new Date(props.creationTime))} ago.</p>
        </div>
        <p className={styles.tweetText}>{props.text}</p>
        <div className={styles.btnsContainer}>
            <FontAwesomeIcon icon={faHeart} className={styles.tweetIcons} onClick={() => handleLikeTweet()} color={user.likedTweets.includes(props._id) ? 'red' : ''}/> {props.likesCounter > 0 && <p>{props.likesCounter}</p>}
            {isOwner && <FontAwesomeIcon icon={faTrash} className={styles.tweetIcons} onClick={() => handleDeleteTweet()}/>}
        </div>
    </div>
  )
}
