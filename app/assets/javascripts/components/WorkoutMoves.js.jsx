class WorkoutMoves extends React.Component {
  constructor(props){
    super(props);
    this.display = this.display.bind(this);
  }

  display() {
    let workout_moves = this.props.workout_moves.map((workout_move, index) => {
      let key = `workout_move-${index}`;
      return(<WorkoutMove key={key} workoutMove={workout_move} changeVideo={this.props.changeVideo} />);
    });
    return workout_moves;
  }

  render() {
    let dayInfo = null;
    if(this.props.day)
      dayInfo = this.props.day.name + "'s";
    return(<div>
             <h4>{dayInfo} Rounds To Complete: {this.props.rounds}</h4>
             <h6>Minimum Completion Time: {this.props.workout_min}</h6>
             <h6>OZF Time: {this.props.workout_ozf}</h6>
             <div className='moves-container'>
               {this.display()}
             </div>
             <a className='btn ozone-button workout-music-button' href="#" onClick={(e) => this.props.changeVideo(this.props.workoutVideo, e)}>Workout Music</a>
           </div>);
  }
}