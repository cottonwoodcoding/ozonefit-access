class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {secondsElapsed: 0, timerRunning: false}
    this.getSeconds = this.getSeconds.bind(this);
    this.getMinutes = this.getMinutes.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleFinishClick = this.handleFinishClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.completed = this.completed.bind(this);
    this.clearWatch = this.clearWatch.bind(this);
    this.timerButtons = this.timerButtons.bind(this);
    this.validateTime = this.validateTime.bind(this);
  }

  getSeconds() {
    return ('0' + this.state.secondsElapsed % 60).slice(-2);
  }

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }

  handleStartClick() {
    self = this;
    this.props.changeVideo(this.props.workoutVideo);
    this.setState({ completed: false, timerRunning: true });
    this.incrementer = setInterval(function () {
      self.setState({ secondsElapsed: (self.state.secondsElapsed + 1) });
    }, 1000)
  }

  validateTime(time) {
    let valid;
    $.ajax({
      url: '/api/v1/validate_time',
      type: 'GET',
      async: false,
      data: {workout_id: this.props.workout.id, time: time},
      success: function(data) {
        valid = data.valid;
      },
      error: function(data) {
        console.log(data);
      }
    });
    return valid;
  }

  handleFinishClick() {
    let ozoneChallenge = this.props.ozoneChallenge ? true : false;
    if(this.validateTime(this.state.secondsElapsed)){
      $.ajax({
        url: '/api/v1/log_workout',
        type: 'POST',
        data: {workout_id: this.props.workout.id, workout_time: {time: this.state.secondsElapsed, ozone_challenge: ozoneChallenge}}
      }).success(data => {
        this.props.fetchLeaderboard();
        this.setState({completed: true, ...data});
      }).error(data => {
        console.log(data);
      });
      this.clearWatch();
    } else {
      alert('You cannot submit a time that is less than the minimum time.');
    }
  }

  handleResetClick() {
    this.clearWatch();
  }

  clearWatch() {
    clearInterval(this.incrementer);
      this.setState({
        lastClearedIncrementer: this.incrementer,
        timerRunning: false,
        secondsElapsed: 0 
      });
  }

  completed() {
    if(this.state.completed) {
      return(<div>
               <h5>{this.props.finishMessage}</h5>
             </div>);
    }
  }

  timerButtons() {
    if(!this.state.timerRunning) {
      return(<p>
               <button type="button" className='red white-text btn btn-large' onClick={this.handleStartClick}>Start!</button>
             </p>);
    }
    if(this.state.timerRunning || this.state.secondsElapsed !== 0) {
      return(<p>
               <button type="button" className='red white-text btn btn-large' onClick={this.handleFinishClick}>Finish</button>
               <button type="button" className='ozone-background white-text btn btn-large' onClick={this.handleResetClick}>Reset</button>
             </p>);
    }
  }

  render() {
    return(<div className='row'>
            <h4 className='center'>O.Zone Timer</h4>
            <h2 className='col s6'>{this.getMinutes()}:{this.getSeconds()}</h2>
            <p className='col s6'>
              {this.timerButtons()}
              {this.completed()}
            </p>
           </div>);
  }
}