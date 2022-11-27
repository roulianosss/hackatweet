import React from 'react';
import { useState } from "react";
import Image from 'next/image';
import styles from '../styles/UploadAvatar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';





export default function UploadAvatar(props) {
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("image", image);
    const response = await fetch(`http://localhost:3000/uploads/avatar/${user.userId}`, {
      method: "POST",
      body
    });
    fetchImg()
  };
  
  const fetchImg = async(userId) =>{
    console.log(`http://localhost:3000/users/${user.userId}`)
    const response = await fetch(`http://localhost:3000/users/${user.userId}`)
    const data = await response.json()
    dispatch(login({ username: data.username, 
                     token: data.token, 
                     firstname: data.firstname, 
                     userId: data._id, likedTweets: data.likedTweets, 
                     avatar:  `data:${data.avatar.contentType};base64,${data.avatar.data}` }))
    props.refreshAllData()
    props.toggleModal()
  }

  return (
    <div className={styles.globalContainer}>
      <div className={styles.modalContainer}>
        <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} onClick={() => props.toggleModal()}/>
        <h4>Select an Image</h4>
        <input type="file" name="image" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
          >
          Update Avatar
        </button>
      </div>
    </div>
  )
}