const userSubmit = document.getElementById("submit");
let clientId = config.clientId;
let clientSecret = config.clientSecret;
const login = document.getElementById("login");

const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI_AFTER_LOGIN = "http://127.0.0.1:5500/playlist.html";
const SCOPES = ["playlist-modify-public"];
const SPACE_DELIMITER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

login.onclick = () => {
  handleLogin();
};

const handleLogin = () => {
  window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
};

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

const updatePlaylist = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/0ezKkJcf2MlnQs2o1Wo2WN`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      collaborative: true,
      public: true,
    }
  );

  const data = await result.json();
  console.log(data);
};

userSubmit.onclick = async () => {
  let token = await getToken();
  updatePlaylist(token);
};
