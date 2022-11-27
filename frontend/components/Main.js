import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import LeftSideBar from "./LeftSideBar";
import CenterBar from "./CenterBar";
import RightSideBar from "./RightSideBar";
import Hashtag from "./Hashtag";
import styles from "../styles/Main.module.css";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function Main() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [allTweets, setAllTweets] = useState([]);
  const [allHashtags, setAllHashtags] = useState([]);

  useEffect(() => {
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    fetchAllTweet();
    fetchAllHashtags();
  };

  const fetchAllTweet = async () => {
    const response = await fetch("http://localhost:3000/tweets/allTweets");
    const allTweets = await response.json();
    setAllTweets(allTweets);
  };

  const fetchAllHashtags = async () => {
    const response = await fetch("http://localhost:3000/hashtags/allHashtags");
    const allHashtags = await response.json();
    setAllHashtags(allHashtags);
  };

  const fetchByUsername = async (username) => {
    const response = await fetch("http://localhost:3000/tweets/allTweets");
    const allTweets = await response.json();
    const tweetsByUsername = allTweets.filter(
      (tweet) => tweet.author.username === username
    );
    setAllTweets(tweetsByUsername);
  };

  const fetchByHashtag = async (hashtagName) => {
    const response = await fetch("http://localhost:3000/tweets/allTweets");
    const allTweets = await response.json();
    const tweetsByHashtag = allTweets.filter((tweet) =>
      tweet.hashtags.some((el) => el.hashtagName == hashtagName)
    );
    setAllTweets(tweetsByHashtag);
  };

  const handleNewTweet = async (tweetContent) => {
    await fetch("http://localhost:3000/tweets/newTweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.userId, tweetContent: tweetContent }),
    });
    refreshAllData();
  };

  const tweetsToComponents = allTweets
    .sort((a, b) => b.creationDate > a.creationDate ? 1 : a.creationDate > b.creationDate ? -1 : 0)
    .map((tweet, i) => (
      <Tweet
        key={uuidv4()}
        {...tweet}
        fetchAllHashtag={fetchAllHashtags}
        fetchAllTweet={() => fetchAllTweet()}
        fetchByUsername={fetchByUsername}
        fetchByHashtag={fetchByHashtag}
      />
    ));

  const hashtagsToComponents = allHashtags
    .sort((a, b) => b.hashtagInTweetsCount > a.hashtagInTweetsCount ? 1 : a.hashtagInTweetsCount > b.hashtagInTweetsCount ? -1 : 0)
    .filter((el, i) => el.hashtagInTweetsCount > 0 && i < 5)
    .map((hashtag) => (
      <Hashtag key={uuidv4()} {...hashtag} fetchByHashtag={fetchByHashtag} />
    ));

  return (
    <div className={styles.globalContainer}>
      <LeftSideBar user={user} refreshAllData={refreshAllData} />
      <CenterBar
        tweetsToComponents={tweetsToComponents}
        handleNewTweet={handleNewTweet}
        refreshAllData={refreshAllData}
      />
      <RightSideBar hashtagsToComponents={hashtagsToComponents} />
    </div>
  );
}
