import defaultSettings from "../Utils/defaultSettings.json";
import { observable, decorate, action } from "mobx";

class SettingsStore {
  Settings =
    localStorage.getItem("Settings") !== null
      ? JSON.parse(localStorage.getItem("Settings"))
      : defaultSettings;
  Shown = false;

  hideSettings() {
    this.Shown = false;
  }

  showSettings() {
    this.Shown = true;
  }

  loadSettings() {
    if (localStorage.getItem("Settings") !== null)
      this.Settings = JSON.parse(localStorage.getItem("Settings"));
    else this.Settings = defaultSettings;
  }

  updateSettings(sets) {
    this.Settings = sets;
    this.saveSettings();
  }

  saveSettings() {
    localStorage.setItem("Settings", JSON.stringify(this.Settings));
  }
}

decorate(SettingsStore, {
  Settings: observable,
  Shown: observable,
  hideSettings: action,
  showSettings: action,
  loadSettings: action,
  updateSettings: action,
  saveSettings: action,
});

export default new SettingsStore();
