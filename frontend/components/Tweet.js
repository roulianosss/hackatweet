import React from 'react'
import Image from 'next/image'
import reactStringReplace from 'react-string-replace'
import styles from '../styles/Main.module.css'
import timeSince  from '../modules/timeSince'
import { login } from '../reducers/user'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Tweet(props) {
    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    const isAuthor = props.author._id === user.userId 

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
        if (user.likedTweets.includes(props._id)) {
            const res = await fetch(`http://localhost:3000/tweets/unlike`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ tweetId: props._id, userId: user.userId }),
            })
            const data = await res.json()
            dispatch(login({ username: data.username, token: data.token, firstname: data.firstname, userId: data._id, likedTweets: data.likedTweets}))
            props.fetchAllTweet()
        } else {
            const res = await fetch(`http://localhost:3000/tweets/like`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ tweetId: props._id, userId: user.userId }),
            })
            const data = await res.json()
            dispatch(login({ username: data.username, token: data.token, firstname: data.firstname, userId: data._id, likedTweets: data.likedTweets}))
            props.fetchAllTweet()
        }
    }
    let tweetContent = props.tweetContent
    const hashtags = [...tweetContent.matchAll(/#[a-z0-9_]+/g)]
    hashtags.map(hashtag => {
        const [ hashtagName ] = hashtag
        tweetContent = reactStringReplace(tweetContent, hashtagName, (match, i) => (
        <span onClick={()=>props.fetchByHashtag(hashtagName)} style={{color: '#3690ee'}}>{match}</span>
        ))
    })

  return (
    <div className={styles.tweet}>
        <div className={styles.tweetHeader}>
            <Image alt='avatar' className={styles.userImage} width={50} height={50} src='/assets/images/avatar.jpg'/>
            <h3 onClick={()=>props.fetchByUsername(props.author.username)} style={{cursor: 'pointer'}}>{props.author.firstname}</h3>
            <p>@{props.author.username} • {timeSince(new Date(props.creationDate))} ago.</p>
        </div>
        <p className={styles.tweetText}>{tweetContent}</p>
        <div className={styles.btnsContainer}>
            <FontAwesomeIcon icon={faHeart} className={styles.tweetIcons} onClick={() => handleLikeTweet()} style={{cursor: 'pointer'}} color={user.likedTweets.includes(props._id) ? 'red' : ''}/> {props.likesCounter > 0 && <p>{props.likesCounter}</p>}
            {isAuthor && <FontAwesomeIcon icon={faTrash} className={styles.tweetIcons} style={{cursor: 'pointer'}} onClick={() => handleDeleteTweet()} />}
        </div>
    </div>
  )
}
