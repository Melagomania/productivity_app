export function PageModel() {
  this.currentScreen = null;
}

PageModel.prototype.setCurrentScreen = function(newCurrentScreen) {
  this.currentScreen = newCurrentScreen;
}

PageModel.prototype.getCurrentScreen = function() {
  return (this.currentScreen);
}
