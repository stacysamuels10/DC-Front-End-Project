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
  console.log(data);
};

getPlaylist();

const searchSong = async (userSearch) => {
  const token = await getToken();
  const result = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${userSearch}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  console.log(data);
};

userSubmit.onclick = () => {
  const userSearch = document.getElementById("searchbar").value;
  searchSong(userSearch);
};
