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

  workoutNotes() {
    if(this.props.workout.notes) {
      return(<div>
               <hr />
               <h5>Workout Notes</h5>
               <textarea className='materialize-textarea center' readOnly>
                 {this.props.workout.notes}
               </textarea>
             </div>);
    }
  }

  render() {
    let dayInfo = null;
    let workoutMusicButton = this.props.workoutClicked ? <a className='btn ozone-button workout-music-button' href="#" onClick={(e) => this.props.changeVideo(this.props.workoutVideo, e, false)}>Workout Music</a> : '';
    if(this.props.day)
      dayInfo = this.props.day.name + "'s";
    return(<div>
             <h3>{this.props.workout.name}</h3>
             <h4>{dayInfo} Rounds To Complete: {this.props.rounds}</h4>
             <h6>Minimum Completion Time: {this.props.workout_min}</h6>
             <h6>OZF If Time Is Between: {this.props.workout_min} - {this.props.workout_ozf}</h6>
             <div className='moves-container'>
               <div className='row'>
                 <div className='col s6'>
                   <small className='red-text'>
                     <i><strong>Click Move To Watch Video</strong></i>
                   </small>
                 </div>
               </div>
               {this.display()}
             </div>
             {this.workoutNotes()}
             {workoutMusicButton}
           </div>);
  }
}