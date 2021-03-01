export default class UserInfo{
  constructor(profileNameSelector, profileJobSelector){
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
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
  }
}