class UserInfo {
  constructor(userData) {
    this._name = document.querySelector(".profile__name");
    this._name.textContent = userData.name;
    this._about = document.querySelector(".profile__about");
    this._about.textContent = userData.about;
    this._avatar = document.querySelector(".profile__image");
    this._avatar.src = userData.avatar;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}

export default UserInfo;
