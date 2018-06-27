export class PageModel {
  constructor() {
    this.currentScreen = null;
  }

  setCurrentScreen(newCurrentScreen) {
    this.currentScreen = newCurrentScreen;
  };

  getCurrentScreen() {
    return (this.currentScreen);
  };
}
