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

  handleFinishClick() {
    let submit = confirm('Finish And Submit Your Score?');
    let ozoneChallenge = this.props.ozoneChallenge ? true : false;
    if(submit){
      $.ajax({
        url: '/api/v1/log_workout',
        type: 'POST',
        data: {workout_time: {time: this.state.secondsElapsed, ozone_challenge: ozoneChallenge}}
      }).success(data => {
        this.props.fetchLeaderboard();
        this.setState({completed: true, ...data});
      }).error(data => {
        console.log(data);
      });
      this.clearWatch();
    } else {
      return
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
               <button type="button" className='red white-text btn btn-large' onClick={this.handleStartClick}>Start Workout!</button>
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