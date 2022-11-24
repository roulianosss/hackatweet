import React from 'react'
import styles from '../styles/Main.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import timeSince  from '../modules/timeSince'
import { useSelector, useDispatch } from 'react-redux'


export default function Tweet(props) {
    const user = useSelector(state => state.user.value)
    
    const isOwner = props.user._id === user.userId 

    const handleDeleteTweet = async() => {
        const response = await fetch(`http://localhost:3000/tweets/deleteTweet/${props._id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
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
            <FontAwesomeIcon icon={faHeart} className={styles.tweetIcons} />
            {isOwner && <FontAwesomeIcon icon={faTrash} className={styles.tweetIcons} onClick={() => handleDeleteTweet()}/>}
        </div>
    </div>
  )
}
