const submit = document.getElementById("submit");
const form = document.getElementById("form");

submit.onclick = (e) => {
  form.innerHTML = null;
  const rsvpCode = document.getElementById("RSVP-Code").value;
  if (rsvpCode === "8315") {
    submit.setAttribute("disabled", "disabled");
    createForm();
  } else {
    let incorrect = document.createElement("p");
    incorrect.innerText =
      "Please enter the 4 digit code found in your invitation email or constant Stacy and Adair";
    form.append(incorrect);
  }
};

const createForm = () => {
  const nameTitle = document.createElement("p");
  nameTitle.innerText = "Please enter name";
  const name = document.createElement("INPUT");
  name.setAttribute("type", "text");
  name.setAttribute("placeholder", "First and Last Name");
  const nameLabel = document.createElement("p");
  nameLabel.innerText =
    "Please fill out one time only for entire family/couple.";
  form.append(nameTitle, name, nameLabel);
  const attending = document.createElement("p");
  attending.innerText = "Will you be attending?";
  const yes = document.createElement("INPUT");
  yes.setAttribute("type", "radio");
  yes.setAttribute("name", "YesorNo");
  yes.setAttribute("id", "yes");
  yes.setAttribute("value", "yes");
  const yesLabel = document.createElement("label");
  yesLabel.setAttribute("for", "no");
  yesLabel.innerHTML = "Yes";
  const no = document.createElement("INPUT");
  no.setAttribute("type", "radio");
  no.setAttribute("name", "YesorNo");
  no.setAttribute("id", "no");
  no.setAttribute("value", "no");
  const noLabel = document.createElement("label");
  noLabel.setAttribute("for", "no");
  noLabel.innerHTML = "No";
  const rsvpSubmit = document.createElement("button");
  rsvpSubmit.innerText = "Submit";
  form.append(attending, yes, yesLabel, no, noLabel, rsvpSubmit);
  rsvpSubmit.onclick = () => {
    rsvpSubmit.setAttribute("disabled", "disabled");
    let answer = document.getElementsByName("YesorNo");
    for (let i = 0; i < answer.length; i++) {
      if (answer[i].checked) {
        if (answer[i].value === "yes") {
          rsvpYes();
        } else {
          rsvpNo();
        }
      }
    }
  };
};

const rsvpYes = () => {
  const numberLabel = document.createElement("p");
  numberLabel.innerText = "Number of people attending:";
  const number = document.createElement("INPUT");
  number.setAttribute("type", "number");
  number.setAttribute("min", "0");
  number.setAttribute("max", "4");
  const dietaryLabel = document.createElement("p");
  dietaryLabel.innerText =
    "Do you or anyone in your party have any dietary needs?";
  const dietary = document.createElement("TEXTAREA");
  dietary.setAttribute(
    "placeholder",
    "Please list any dietary restrictions you may have"
  );
  const extraInfoLabel = document.createElement("p");
  extraInfoLabel.innerText =
    "Is there anything else you would like to let Stacy and Adair know?";
  const extraInfo = document.createElement("TEXTAREA");
  extraInfo.setAttribute("placeholder", "We are excited to hear from you!");
  const finalSubmit = document.createElement("button");
  finalSubmit.innerHTML = "Submit";
  form.append(
    numberLabel,
    number,
    dietaryLabel,
    dietary,
    extraInfoLabel,
    extraInfo,
    finalSubmit
  );
  finalSubmit.onclick = thankYou;
};

const rsvpNo = () => {
  form.innerHTML = null;
  const sorry = document.createElement("h3");
  sorry.innerText =
    "We are so sorry to hear that. We will miss you dearly! If there is anything you would like to tell the brides, please write below";
  const messageToCouple = document.createElement("TEXTAREA");
  messageToCouple.setAttribute(
    "placeholder",
    "We are excited tohear from you!"
  );
  const finalSubmit = document.createElement("button");
  finalSubmit.innerHTML = "Submit";
  form.append(sorry, messageToCouple, finalSubmit);
  finalSubmit.onclick = thankYou;
};

thankYou = () => {
  form.innerHTML = null;
  const thankYouMessage = document.createElement("h1");
  thankYouMessage.innerText =
    "Thank you for RSVPing! We greatly appreciate you!";
  form.append(thankYouMessage);
};
