const submit = document.getElementById("submit");
const form = document.getElementById("form");
const nameLine = document.getElementById("nameLine");
const nameLabel1 = document.getElementById("nameLabel1");
const attending = document.getElementById("attending");
const submit1 = document.getElementById("submit1");
const numattending = document.getElementById("numattending");
const dietary1 = document.getElementById("dietary1");
const note = document.getElementById("note");
const submit2 = document.getElementById("submit2");
const wronganswer = document.getElementById("wronganswer");

submit.onclick = (e) => {
  nameLine.innerHTML = null;
  nameLabel1.innerHTML = null;
  attending.innerHTML = null;
  submit1.innerHTML = null;
  numattending.innerHTML = null;
  dietary1.innerHTML = null;
  note.innerHTML = null;
  submit2.innerHTML = null;
  wronganswer.innerHTML = null;
  const rsvpCode = document.getElementById("RSVP-Code").value;
  if (rsvpCode === "8315") {
    submit.setAttribute("disabled", "disabled");
    createForm();
  } else {
    let incorrect = document.createElement("p");
    incorrect.innerText =
      "Please enter the 4 digit code found in your invitation email or constant Stacy and Adair";
    wronganswer.append(incorrect);
  }
};

const createForm = () => {
  wronganswer.innerHTML = null;
  const nameTitle = document.createElement("p");
  nameTitle.innerText = "Please enter name";
  const name = document.createElement("INPUT");
  name.setAttribute("type", "text");
  name.setAttribute("placeholder", "First and Last Name");
  const nameLabel = document.createElement("p");
  nameLabel.innerText =
    "Please fill out one time only for entire family/couple.";
  nameLine.append(nameTitle, name);
  nameLabel1.append(nameLabel);
  const attending1 = document.createElement("p");
  attending1.innerText = "Will you be attending?";
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
  rsvpSubmit.classList = "submit";
  rsvpSubmit.innerText = "Submit";
  attending.append(attending1);
  submit1.append(yes, yesLabel, no, noLabel, rsvpSubmit);
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
  number.setAttribute("type", "text");
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
  finalSubmit.classList = "submit";
  finalSubmit.innerHTML = "Submit";
  numattending.append(numberLabel, number);
  dietary1.append(dietaryLabel, dietary);
  note.append(extraInfoLabel, extraInfo);
  submit2.append(finalSubmit);
  finalSubmit.onclick = thankYou;
};

const rsvpNo = () => {
  nameLine.innerHTML = null;
  nameLabel1.innerHTML = null;
  attending.innerHTML = null;
  submit1.innerHTML = null;
  numattending.innerHTML = null;
  dietary1.innerHTML = null;
  note.innerHTML = null;
  submit2.innerHTML = null;
  const sorry = document.createElement("h3");
  sorry.innerText =
    "We are so sorry to hear that. We will miss you dearly! If there is anything you would like to tell the brides, please write below";
  const messageToCouple = document.createElement("TEXTAREA");
  messageToCouple.setAttribute(
    "placeholder",
    "We are excited tohear from you!"
  );
  const finalSubmit = document.createElement("button");
  finalSubmit.classList = "submit";
  finalSubmit.innerHTML = "Submit";
  submit2.append(sorry, messageToCouple, finalSubmit);
  finalSubmit.onclick = thankYou;
};

thankYou = () => {
  nameLine.innerHTML = null;
  nameLabel1.innerHTML = null;
  attending.innerHTML = null;
  submit1.innerHTML = null;
  numattending.innerHTML = null;
  dietary1.innerHTML = null;
  note.innerHTML = null;
  submit2.innerHTML = null;
  const thankYouMessage = document.createElement("h1");
  thankYouMessage.innerText =
    "Thank you for RSVPing! We greatly appreciate you!";
  form.append(thankYouMessage);
};
