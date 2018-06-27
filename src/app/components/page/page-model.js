export function PageModel() {
  this.currentScreen = null;
  this.observers = [];
}

PageModel.prototype.setCurrentScreen = function(newCurrentScreen) {
  this.currentScreen = newCurrentScreen;
  this.notify(this);
};

PageModel.prototype.getCurrentScreen = function() {
  return (this.currentScreen);
};

PageModel.prototype.addObserver = function (observer) {
  this.observers.push(observer);
};

PageModel.prototype.notify = function (data) {
  this.observers.forEach( observer => observer.update(data));
};
