export default class UserInfo{
  constructor(profileNameSelector, profileJobSelector, profileAvatarSelector){
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  set id(userId){
    this._id = userId;
  }

  get id(){
    return this._id;
  }

  getUserInfo(){
    return {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent,
    }
  }

  setUserInfo(info){
    this._profileName.textContent = info.profileName;
    this._profileJob.textContent = info.profileJob;
    this._profileAvatar.src = info.avatar;
  }
}