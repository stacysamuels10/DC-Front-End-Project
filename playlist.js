const userSubmit = document.getElementById("submit");
let clientId = config.clientId;
let clientSecret = config.clientSecret;
const login = document.getElementById("login");
const search = document.getElementById("search");
const container = document.getElementById("search");
const artistButtons = document.getElementById("artistButtons");
const results = document.getElementById("results");
const playlist = document.getElementById("playlistRec");

let currentPlaylist = [
  { song: "Glamorous by Fergie" },
  { song: "Halo by Beyonce" },
  { song: "Somewhere Over the Rainbow by Israel Kamakawiwo'ole" },
];

const getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await result.json();
  let token = data.access_token;
  return token;
};

const firstSearch = async (artSearch, trackSearch, userSearch) => {
  const token = await getToken();
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${userSearch}&type=artist,track&limit=5`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();

  console.log(data);
  showArtist(data);
  artSearch.onclick = () => {
    results.innerHTML = null;
    showArtist(data);
  };
  trackSearch.onclick = () => {
    results.innerHTML = null;
    showTracks(data, currentPlaylist);
  };
};

const showArtist = (data) => {
  for (let i = 0; i < data?.artists?.items?.length; i++) {
    let arts = data.artists.items[i];
    let artist = document.createElement("h5");
    artist.id = `artist-${i}`;
    artist.innerText = data.artists.items[i].name;
    let artbtn = document.createElement("button");
    artbtn.innerText = "Select this artist";
    artbtn.id = data.artists.items[i].id;
    artbtn.name = "artbutton";
    artbtn.classList = "button";

    const moreInfo = (info) => {
      console.log(info);
    };
    artbtn.onclick = () => moreInfo(arts);
    results.append(artist);
    results.append(artbtn);
    artbtn.onclick = () => {
      results.innerHTML = null;
      artistTopTrack(artbtn, currentPlaylist);
    };
  }
};

const showTracks = (data, currentPlaylist) => {
  for (let i = 0; i < data?.tracks?.items?.length; i++) {
    let tracks = data.tracks.items[i];
    let track = document.createElement("h5");
    track.id = `track-${i}`;
    track.innerText = `${data.tracks.items[i].name} by ${data.tracks.items[i].artists[0].name} `;
    let trkbtn = document.createElement("button");
    trkbtn.innerText = "Add this song to recommendations";
    trkbtn.id = data.tracks.items[i].id;
    trkbtn.name = `trkbtn-${i}`;
    trkbtn.classList = "button";

    const moreInfo = (info, currentPlaylist) => {
      console.log(info);
      const songChosen = document.createElement("li");
      songChosen.innerText = `${data.tracks.items[i].name} by ${data.tracks.items[i].artists[0].name} `;
      playlistRec.append(songChosen);
      const song = {
        song: `${data.tracks.items[i].name} by ${data.tracks.items[i].artists[0].name} `,
      };
      console.log(currentPlaylist);
      currentPlaylist.push(song);
      window.localStorage.setItem(0, JSON.stringify(currentPlaylist));
      console.log(currentPlaylist);
    };
    trkbtn.onclick = () => {
      moreInfo(tracks, currentPlaylist);
    };
    results.append(track);
    results.append(trkbtn);
  }
};

const artistTopTrack = async (artbtn, currentPlaylist) => {
  const token = await getToken();
  console.log(`token ${token}`);
  console.log(`button ${artbtn.id}`);
  const result = await fetch(
    `https://api.spotify.com/v1/artists/${artbtn.id}/top-tracks?country=us&limit=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await result.json();
  console.log(data.tracks);
  for (let i = 0; i < data?.tracks?.length; i++) {
    let tracks = data.tracks[i];
    let track = document.createElement("h5");
    track.id = `track-${i}`;
    track.innerText = `${data.tracks[i].name} by ${data.tracks[i].artists[0].name} `;
    let trkbtn = document.createElement("button");
    trkbtn.innerText = "Add this song to recommendations";
    trkbtn.id = data.tracks[i].id;
    trkbtn.name = `trkbtn-${i}`;
    trkbtn.classList = "button";

    const moreInfo = (info, currentPlaylist) => {
      console.log(info);
      const songChosen = document.createElement("li");
      songChosen.innerText = `${data.tracks[i].name} by ${data.tracks[i].artists[0].name} `;
      playlistRec.append(songChosen);
      const song = {
        song: `${data.tracks[i].name} by ${data.tracks[i].artists[0].name} `,
      };
      console.log(currentPlaylist);
      currentPlaylist.push(song);
      window.localStorage.setItem(0, JSON.stringify(currentPlaylist));
      console.log(currentPlaylist);
    };
    trkbtn.onclick = () => {
      moreInfo(tracks, currentPlaylist);
    };
    results.append(track);
    results.append(trkbtn);
  }
};

userSubmit.onclick = () => {
  results.innerHTML = null;
  artistButtons.innerHTML = null;
  const userSearch = document.getElementById("searchbar").value;
  const artSearch = document.createElement("button");
  artSearch.innerText = "Artist";
  const trackSearch = document.createElement("button");
  trackSearch.innerText = "Songs";
  artistButtons.append(artSearch, trackSearch);
  firstSearch(artSearch, trackSearch, userSearch);
};

window.onload = (event) => {
  let array = JSON.parse(window.localStorage.getItem(0));
  for (let i = 0; i < array.length; i++) {
    const element = document.createElement("li");
    element.innerText = array[i].song;
    playlistRec.append(element);
  }
};
