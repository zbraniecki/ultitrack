class Workout {
  constructor() {
    this.running = false;
  }

  init(plan) {
    this._plan = plan;
    this._timer = new Timer(this);
    this.ui = {
      stage: document.getElementById('stage'),
      phase: document.getElementById('phase'),
      type: document.getElementById('type'),
      time: document.getElementById('time'),
      next: document.getElementById('next')
    };
    this._ptr = [0, 0];
    this._timer.init();
    this._paint();
  }

  start() {
    this._ptr[1] = 1;
    this._timer.start();
    this.running = true;
    this._paint();
  }

  stop() {
    this._timer.stop();
    this.running = false;
  }

  advance() {
    if (!this.running) {
      if (this._ptr[1] === 0) {
        this.start();
      }
    } else {
      this._ptr[1] += 1;
      if (this._ptr[1] > this._plan[this._ptr[0]].count * 2 - 1) {
        this.running = false;
        this._timer.stop();
        this._paint(); 
      } else {
        this._timer.reset();

        if (this._ptr[1] % 2) {
          this._timer.type = 'counter';
        } else {
          this._timer.type = 'countdown';
          this._timer.target = this._plan[this._ptr[0]].children[0].preconditions[0].time;
        }

        this._timer.start();
        this._paint();
      }
    }
  }

  reset() {
    this._timer.reset();
    this._ptr = [0, 0];
    this.running = false;
    this._timer._paint();
    this._paint();
  }

  _onTick() {
    this._paint();
  }

  _paint() {
    if (this._ptr[1] > this._plan[this._ptr[0]].count * 2 - 1 || this._ptr[1] === 0) {
      this.ui.phase.textContent = '';
    } else {
      const phase = this._ptr[1] % 2 ?
        this._plan[this._ptr[0]].children[0].type :
        this._plan[this._ptr[0]].children[0].preconditions[0].type;
      this.ui.phase.textContent = phase;
    }

    if (this._ptr[1] > this._plan[this._ptr[0]].count * 2 - 1) {
      this.ui.time.textContent = 'End';
      this.ui.next.textContent = '';
    } else if (!this.running) {
      this.ui.next.textContent = `(rest: ${this._plan[this._ptr[0]].children[0].preconditions[0].time}s)`;
      this.ui.time.textContent = this._plan[this._ptr[0]].children[0].time;
    } else {
      this.ui.next.textContent = '';
    }

    let stage = this._ptr[1] % 2 ?
      this._ptr[1] > 1 ? (this._ptr[1] + 1) / 2 : 1 :
      this._ptr[1] / 2;
    const stages = this._plan[this._ptr[0]].count; 

    this.ui.stage.textContent = `${stage}/${stages}`;

    this.ui.type.textContent = `${this._plan[this._ptr[0]].children[0].distance}m`;
  }
}
