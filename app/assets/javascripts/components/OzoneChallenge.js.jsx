class OzoneChallenge extends React.Component {
  constructor(props){
    super(props);
    this.state = {leaders: [], videoUrl: this.props.videoUrl, workoutVideoUrl: this.props.videoUrl};
    this.fetchLeaderboard = this.fetchLeaderboard.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
  }

  componentWillMount() {
    this.fetchLeaderboard();
  }

  changeVideo(url, e = null) {
    if(e){
      e.preventDefault();
    }
    this.setState({videoUrl: url});
  }

  fetchLeaderboard() {
    $.ajax({
      url: '/api/v1/leaders',
      type: 'GET',
      data: {ozone_challenge: true}
    }).success(data => {
      this.setState({leaders: data.leaders})
    }).error(data => {
      console.log(data);
    });
  } 

  render() {
    return(<div>
             <div className='row center'>
               <div className='col s12 m6'>
                 <div className='row hide-on-small-only'>
                   <h4>O.Zone Motivation</h4>
                   <h3 className='ozone-text'>
                    {this.props.motivation.text}
                   </h3>
                 </div>
               </div>
               <div className='col s12 m6'>
                 <StopWatch fetchLeaderboard={this.fetchLeaderboard} workoutVideo={this.state.workoutVideoUrl} changeVideo={this.changeVideo} ozoneChallenge={true} finishMessage='Nice work! Keep challenging yourself to get to the top!' />
               </div>
             </div>
             <div className='row center'>
               <div className='col s12 m6 center'>
                 <div className='card workout-moves'>
                   <WorkoutMoves fetchLeaderboard={this.fetchLeaderboard} workout_moves={this.props.workout_moves} rounds={this.props.rounds} workout_min={this.props.workout_min} workout_ozf={this.props.workout_ozf} workoutVideo={this.state.workoutVideoUrl} changeVideo={this.changeVideo} />
                 </div>
               </div>
               <div className='col s12 m6'>
                 <Video videoUrl={this.state.videoUrl} />
               </div>
             </div>
             <div className='row'>
               <div className='col s12'>
                 <Leaderboard leaders={this.state.leaders} title='O.Zone Challenge Leaders' />
               </div>
             </div>
           </div>);
  }
}
