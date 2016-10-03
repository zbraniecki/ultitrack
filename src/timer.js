class Timer {
  constructor(workout) {
    this.running = false;
    this._workout = workout;
  }

  init() {
    this.ui = {
      time: document.getElementById('time')
    };
    this._time = 0;
    this.type = 'counter'; 
    this.target = null;
  }

  start() {
    this.running = true;
    this._I = setInterval(this._onTick.bind(this), 1000);
    this._paint();
  }

  stop() {
    this.running = false;;
    this._I = clearInterval(this._I);
  }

  reset() {
    this._I = clearInterval(this._I);
    this._time = 0;
    this.running = false;
  }

  _onTick() {
    this._time += 1;
    this._workout._onTick();
    this._paint();
  }

  _paint() {
    if (this.type === 'counter') {
      this.ui.time.textContent = this._time;
    }
    if (this.type === 'countdown') {
      const val = this.target - this._time;
      this.ui.time.textContent = val;
    }
  }
}
