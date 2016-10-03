{
  function onButton1() {
    workout.advance();
  }

  function onButton2() {
    workout.reset();
  }

  function onStageSelect() {
    if (workout.running) { return; }
    const val = prompt('Number of reps?', workout._plan[0].count);
    if (val === null) { return; }
    workout._plan[0].count = val;
    workout._paint();
  }

  function onTypeSelect() {
    if (workout.running) { return; }
    const val = prompt('Distance?', workout._plan[0].children[0].distance);
    if (val === null) { return; }
    workout._plan[0].children[0].distance = val;
    workout._paint();
  }

  function onTimeSelect() {
    if (workout.running) { return; }
    const val = prompt('Target?', workout._plan[0].children[0].time);
    if (val === null) { return; }
    workout._plan[0].children[0].time = val;
    workout._paint();
  }

  function onNextSelect() {
    if (workout.running) { return; }
    const val = prompt('Target?', workout._plan[0].children[0].preconditions[0].time);
    if (val === undefined) { return; }
    workout._plan[0].children[0].preconditions[0].time = val;
    workout._paint();
  }

  const workout = new Workout();

  const defaultPlan = [
    {
      type: 'block',
      count: 1,
      children: [
        {
          type: 'sprint',
          distance: '200',
          time: 30,
          start: 'button',
          end: 'button',
          preconditions: [
            {
              type: 'rest',
              time: 60
            }
          ]
        } 
      ]
    }
  ];

  const plan2 = [
    {
      type: 'block',
      count: 2,
      children: [
        {
          type: 'sprint',
          distance: '400',
          time: 65,
          start: 'button',
          end: 'button',
          preconditions: [
            {
              type: 'rest',
              time: 120
            }
          ]
        } 
      ]
    },
    {
      type: 'block',
      count: 2,
      children: [
        {
          type: 'sprint',
          distance: '300',
          time: 45,
          start: 'button',
          end: 'button',
          preconditions: [
            {
              type: 'rest',
              time: 120
            }
          ]
        } 
      ]
    },
    {
      type: 'block',
      count: 2,
      children: [
        {
          type: 'sprint',
          distance: '200',
          time: 30,
          start: 'button',
          end: 'button',
          preconditions: [
            {
              type: 'rest',
              time: 120
            }
          ]
        } 
      ]
    },
  ];
  workout.init(plan2);

  const button1 = document.getElementById('button1');
  button1.addEventListener('click', onButton1);

  const button2 = document.getElementById('button2');
  button2.addEventListener('click', onButton2);

  const stage = document.getElementById('stage');
  stage.addEventListener('click', onStageSelect);

  const distance = document.getElementById('type');
  distance.addEventListener('click', onTypeSelect);

  const time = document.getElementById('time');
  time.addEventListener('click', onTimeSelect);

  const next = document.getElementById('next');
  next.addEventListener('click', onNextSelect);
}
