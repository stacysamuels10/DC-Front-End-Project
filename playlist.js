const userSubmit = document.getElementById("submit");
let clientId = config.clientId;
let clientSecret = config.clientSecret;

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
  return data.access_token;
};

const getPlaylist = async () => {
  const token = await getToken();
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/0ezKkJcf2MlnQs2o1Wo2WN`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  console.log(data);
};

const firstSearch = async (userSearch) => {
  const token = await getToken();
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${userSearch}&type=artist,track&limit=5`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  const artistButtons = document.createElement("div");
  artistButtons.classList = "artbuttondiv";
  console.log(data.artists);
  console.log(data);
  showArtist(data);
  showTracks(data);
};

const showArtist = (data) => {
  for (let i = 0; i < data?.artists?.items?.length; i++) {
    let arts = data.artists.items[i];
    let artist = document.createElement("h5");
    artist.id = `artist-${i}`;
    artist.innerText = data.artists.items[i].name;
    let artbtn = document.createElement("button");
    artbtn.innerText = "Select this artist";
    artbtn.id = `artbtn-${i}`;
    artbtn.classList = "button";

    const moreInfo = (info) => {
      console.log(info);
    };
    artbtn.onclick = () => moreInfo(arts);
    search.append(artist);
    search.append(artbtn);
  }
};

const showTracks = (data) => {
  for (let i = 0; i < data?.tracks?.items?.length; i++) {
    let tracks = data.tracks.items[i];
    let track = document.createElement("h5");
    track.id = `track-${i}`;
    track.innerText = `${data.tracks.items[i].name} by ${data.tracks.items[i].artists[0].name} `;
    let trkbtn = document.createElement("button");
    trkbtn.innerText = "Add this song to playlist";
    trkbtn.id = `trkbtn-${i}`;
    trkbtn.name = data.tracks.items[i].id;
    trkbtn.classList = "button";

    const moreInfo = (info) => {
      console.log(info);
    };
    trkbtn.onclick = () => {
      moreInfo(tracks);
    };
    search.append(track);
    search.append(trkbtn);
  }
};

// const addSong = async () => {
//   const token = await getToken();
// };

userSubmit.onclick = () => {
  const userSearch = document.getElementById("searchbar").value;
  const artSearch = document.createElement("button");
  artSearch.innerText = "Artist";
  const trackSearch = document.createElement("button");
  trackSearch.innerText = "Songs";
  search.append(artSearch, trackSearch);
  firstSearch(userSearch);
};
