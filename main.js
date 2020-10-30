const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form"),
  input = document.getElementById("form_input"),
  main = document.getElementById("result");
toggle = document.getElementById("toggle");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  if (inputValue) {
    getUserData(inputValue);
    input.value = "";
  }
});

function addRepoLink(reposData) {
  const card_repos = document.getElementById("card_repos");
  reposData.slice(0, 10).forEach((repo) => {
    const repoLink = document.createElement("a");
    repoLink.classList.add("repoLink");
    repoLink.classList.add("change");
    repoLink.href = repo.html_url;
    repoLink.innerText = repo.name;
    card_repos.appendChild(repoLink);
    card_repos.appendChild(document.createElement("br"));
  });
}

function createResultCard(userData) {
  const cardHTML = `
        <div id="card_wrap" class="change">
            <div id="card_image">
                <img id="card_avatar" src=${userData.avatar_url}>
            </div>
            <div id="card_profile">
                <p>${userData.name}</p>
                <p>
                  <span>followers</span> ${userData.followers} 
                  <span>following</span> ${userData.following}
                </p>
                <hr>
                <p>${userData.bio}</p>
                <p>
                  <span>repositories</span>
                </p>
                <div id="card_repos"></div>
            </div>
        </div>
    `;
  main.innerHTML = cardHTML;
}

async function getReposData(userData) {
  const response = await fetch(API_URL + userData.login + "/repos");
  const result = await response.json();
  addRepoLink(result);
}

async function getUserData(userName) {
  const response = await fetch(API_URL + userName);
  const result = await response.json();
  createResultCard(result);
  getReposData(result);
}

const onToggle = () => {
  const changeList = document.getElementsByClassName("change");

  for (let i = 0; i < changeList.length; i++) {
    if (toggle.checked) {
      changeList[i].classList.add("white");
    } else {
      changeList[i].classList.remove("white");
    }
  }
};

toggle.addEventListener("click", (event) => setTimeout(onToggle(), 0));
