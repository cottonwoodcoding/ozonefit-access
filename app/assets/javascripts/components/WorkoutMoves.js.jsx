class WorkoutMoves extends React.Component {
  constructor(props){
    super(props);
    this.state = {workout_moves: [], rounds: ''};
    this.display = this.display.bind(this);
  }

  componentWillMount() {
    if(this.props.day) {
      $.ajax({
        url: '/api/v1/days/'+this.props.day.id+'/workout_moves',
        type: 'GET',
        data: {day_id: this.props.day.id}
      }).success(data => {
        this.setState({workout_moves: data.moves, rounds: data.rounds});
      }).error(data => {
        console.log(data);
      });
    } else if(this.props.workout) {
      this.setState({workout_moves: this.props.workout.moves, rounds: this.props.workout.rounds})
    }
  }

  display() {
    let workout_moves = this.state.workout_moves.map(workout_move => {
      let moveData;
      workout_move.workout_moves.map(wm => {
        if(wm.move_id == workout_move.id) {
          moveData = wm;
        }
      });
      let key = `workout_move-${workout_move.id}`;
      return(<WorkoutMove key={key} workoutMove={workout_move} moveData={moveData} changeVideo={this.props.changeVideo} />);
    });
    return workout_moves;
  }

  render() {
    let dayInfo = null;
    if(this.props.day)
      dayInfo = this.props.day.name + "'s";
    return(<div>
             <h4>{dayInfo} Rounds To Complete: {this.state.rounds}</h4>
             <h6>Minimum Completion Time: {this.props.workout_min}</h6>
             <h6>OZF Time: {this.props.workout_ozf}</h6>
             <div className='moves-container'>
               {this.display()}
             </div>
             <a className='btn ozone-button workout-music-button' href="#" onClick={(e) => this.props.changeVideo(this.props.workoutVideo, e)}>Workout Music</a>
           </div>);
  }
}