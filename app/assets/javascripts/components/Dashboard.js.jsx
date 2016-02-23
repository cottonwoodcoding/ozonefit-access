class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {leaders: [], videoUrl: this.props.videoUrl, workoutVideoUrl: this.props.videoUrl};
    this.fetchLeaderboard = this.fetchLeaderboard.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
    this.leaderboardTitle = this.leaderboardTitle.bind(this);
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
      type: 'GET'
    }).success(data => {
      this.setState({leaders: data.leaders})
    }).error(data => {
      console.log(data);
    });
  } 

  leaderboardTitle() {
    return(this.props.currentDay.name  + "'s Top 5");
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
                 <StopWatch workout={this.props.workout} fetchLeaderboard={this.fetchLeaderboard} workoutVideo={this.state.workoutVideoUrl} changeVideo={this.changeVideo} finishMessage='Nice work! Keep checking the leaderboard to see if you finshed in the top 5 today!' />
               </div>
             </div>
             <div className='row center'>
               <div className='col s12 m6 center'>
                 <div className='card workout-moves'>
                   <WorkoutMoves workout_min={this.props.workout_min} workout_ozf={this.props.workout_ozf} fetchLeaderboard={this.fetchLeaderboard} day={this.props.currentDay} workoutVideo={this.state.workoutVideoUrl} changeVideo={this.changeVideo} />
                 </div>
               </div>
               <div className='col s12 m6'>
                 <Video videoUrl={this.state.videoUrl} />
               </div>
             </div>
             <div className='row'>
               <div className='col s12'>
                 <Leaderboard leaders={this.state.leaders} title={this.leaderboardTitle()} />
               </div>
             </div>
           </div>);
  }
}
