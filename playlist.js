const clientId = "03fefc87e6684c78a631df76fb22ff7d";
const clientSecret = "5ca0963ef36f4459a6aedb3d618c77b1";

const userSubmit = document.getElementById("submit");

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
  console.log(data.access_token);
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
};

getPlaylist();

const searchArtist = async (userSearch) => {
  const token = await getToken();
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${userSearch}&type=artist,track`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  const artistButtons = document.createElement("div");
  artistButtons.classList = "artbuttondiv";
  console.log(data.tracks);
  console.log(data.artists);

  for (let i = 0; i < data?.artists?.items?.length; i++) {
    let arts = data.artists.items[i];
    let artist = document.createElement("h5");
    artist.id = `artist-${i}`;
    artist.innerText = data.artists.items[i].name;
    let artbtn = document.createElement("button");
    artbtn.innerText = "Select this artist";
    artbtn.id = `artbtn-${i}`;
    artbtn.classList = "button";
    //console.log(data.artists.items[i].name);

    const moreInfo = (info) => {
      console.log(info);
    };
    artbtn.onclick = () => moreInfo(arts);
    search.append(artist);
    search.append(artbtn);
  }
};

userSubmit.onclick = () => {
  const userSearch = document.getElementById("searchbar").value;
  const artSearch = document.createElement("button");
  artSearch.innerText = "Artist";
  const trackSearch = document.createElement("button");
  trackSearch.innerText = "Songs";
  search.append(artSearch, trackSearch);
  searchArtist(userSearch);
};
