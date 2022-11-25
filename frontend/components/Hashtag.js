import React from 'react'
import styles from '../styles/Main.module.css'

export default function (props) {
  return (
    <div className={styles.hashtagContainer}>
        <h4 onClick={()=>props.fetchByHashtag(props.hashTagName)} style={{cursor: 'pointer'}}>{props.hashTagName}</h4>
        <p>{props.hashTagTweetsCount} tweets</p>
    </div>
  )
}
