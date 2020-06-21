/*global chrome*/
import React, { useState, useEffect } from "react";
import MusicCard from "./musicCard/MusicCards";
import { API_KEY, YT_API_KEY } from "../util/api";
import axios from "axios";
import "../css/Main.css";

const Main = () => {
  const [musicRes, setMusicRes] = useState([]);
  const [showQr, setShowQr] = useState(false);
  const [userURI, setUserURI] = useState([]);
  const [youtubeID, setYoutubeID] = useState("");

  const fetchData = async () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      setYoutubeID(url.split("v=")[1]);
      // use `url` here inside the callback because it's asynchronous!
    });
    try {
      let res = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/search/`,
        params: {
          q: "Mac Miller - Best Day Ever",
          type: "track",
          market: "US",
          limit: 5,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_KEY,
        },
      });
      setMusicRes(res.data.tracks.items);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/me/`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_KEY,
        },
      });
      setUserURI(res.data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYoutube = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${youtubeID}&key=${YT_API_KEY}`,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer ",
        },
      });
      setUserURI(res.data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  // curl \
  // 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=G6vMXTYZJz0&key=[YOUR_API_KEY]' \
  // --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  // --header 'Accept: application/json' \
  // --compressed

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  return (
    <div className="mainComponent">
      <div className="banner">
        <img
          id="closeBtn"
          onClick={() => {
            window.close();
          }}
          alt="close"
          src="https://static.thenounproject.com/png/73078-200.png"
        />
        {/* <i class="fas fa-window-close"></i> */}
        <img
          alt="profile"
          id="profileIcon"
          src="https://i.ibb.co/PhhB10N/profileimg.png"
          onClick={() => {
            setShowQr(!showQr);
          }}
        />
        {showQr ? (
          <img
            id="qrImg"
            alt="profileQr"
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${userURI}&amp.png`}
          />
        ) : null}

        {/* <img
          alt="settings"
          src="https://img.icons8.com/material-rounded/24/000000/settings.png"
        /> */}
      </div>
      <div className="resultsList">
        {musicRes.length ? (
          <MusicCard result={musicRes} />
        ) : (
          <h3>loading ...</h3>
        )}
      </div>
    </div>
  );
};

export default Main;
