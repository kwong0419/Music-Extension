import React, { useState, useEffect } from "react";
import { API_KEY } from "../util/api";
import axios from "axios";
import "../css/AddForm.css";

const AddForm = ({ uri, song_id }) => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [togglePlaylistMessage, setTogglePlaylistMessage] = useState(false);
  const [toggleLibraryMessage, setToggleLibraryMessage] = useState(false);

  const fetchPlaylists = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/me/playlists`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_KEY,
        },
      });
      setPlaylists(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPlaylist = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: `https://api.spotify.com/v1/playlists/${currentPlaylist}/tracks?uris=${uri}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_KEY,
        },
      });
      setTogglePlaylistMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickLibrary = async () => {
    try {
      await axios({
        method: "put",
        url: `https://api.spotify.com/v1/me/tracks?ids=${song_id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_KEY,
        },
      });
      setToggleLibraryMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="addDiv">
      <form id="formPlaylist" onSubmit={handleSubmitPlaylist}>
        <select
          onChange={(e) => setCurrentPlaylist(e.target.value)}
          name="playlist"
          id="playlistSelect"
        >
          <option value="" selected disabled>
            Select a Playlist
          </option>
          {playlists.map((playlist) => {
            return (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            );
          })}
        </select>
        <button
          id="playlistBtn"
          type="submit"
          class="button"
          style={{ verticalAlign: "middle" }}
        >
          <span>Add to Playlist</span>
        </button>
      </form>
      {togglePlaylistMessage ? (
        <h3 id="playlistMsg">Song successfully added to Playlist</h3>
      ) : null}

      <button
        id="libraryBtn"
        onClick={handleClickLibrary}
        type="click"
        style={{ verticalAlign: "middle" }}
      >
        <span>Add to Library</span>
      </button>

      {toggleLibraryMessage ? (
        <h3 id="libraryMsg">Song successfully saved to Library</h3>
      ) : null}
    </div>
  );
};

export default AddForm;
