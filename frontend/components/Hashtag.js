import React from 'react'
import styles from '../styles/Main.module.css'

export default function (props) {
  return (
    <div className={styles.hashtagContainer}>
        <h4 onClick={()=>props.fetchByHashtag(props.hashtagName)} style={{cursor: 'pointer'}}>{props.hashtagName}</h4>
        <p>{props.hashtagInTweetsCount} tweets</p>
    </div>
  )
}
