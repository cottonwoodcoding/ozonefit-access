class Workout extends React.Component {
  constructor(props){
    super(props);
    this.state = {edit: false, moves: []};
    this.displayView = this.displayView.bind(this);
    this.workoutActions = this.workoutActions.bind(this);
    this.setWorkout = this.setWorkout.bind(this);
  }

  formatTime(time) {
    return (new Date).clearTime()
                     .addSeconds(time)
                     .toString('mm:ss');
  }

  workoutActions() {
    let setWorkoutHtml;
    if(this.props.workout.id != this.props.day.workout_id) {
      let today = new Date();
      if(this.props.day.id == today.getDay())
        setWorkoutHtml = <a className='btn ozone-button bottom-20' href='#' onClick={(e) => this.setWorkout(e, this.props.workout.id, this.props.day.id)}>Set As Todays Workout</a>;
    }
    return(<div className="card-action">
             {setWorkoutHtml}
             <a className='btn red white-text bottom-20' href='#' onClick={(e) => this.props.deleteWorkout(e, this.props.workout.url)}>Delete Workout</a>
           </div>);
  }

  setWorkout(e, workoutId, dayId) {
    e.preventDefault();

    $.ajax({
      url: 'api/v1/set_workout',
      type: 'POST',
      data: {id: dayId, workout_id: workoutId}
    }).success(data => {
      this.props.getDays(true);
    }).error(data => {
      console.log(data);
    });
  }

  displayMoves(workout) {
    let moves = workout.workout_moves.map(workoutMove => {
      return(<div className='row'>
               <div className='col s6'>
                 {workoutMove.name}
               </div>
               <div className='col s6'>
                 {workoutMove.reps}
               </div>
             </div>);
    });
    return moves;
  }

  displayView() {
    if(!this.state.editView) {
      let workout = this.props.workout;

      return(<div className="col s12">
               <div className="card blue-grey darken-1">
                 <div className="card-content white-text">
                   <span className="card-title">Workout</span>
                   <p>Min Time: {this.formatTime(workout.min_time)}</p>
                   <p>Ozf Time: {this.formatTime(workout.ozf_time)}</p>
                   <p>Rounds: {workout.rounds}</p>
                   <p>Number of Moves: {workout.workout_moves.length}</p>
                   <div class='row'>
                     <div className='col s6'>
                       <h4>Move</h4>
                     </div>
                     <div className='col s6'>
                       <h4>Reps</h4>
                     </div>
                     <hr />
                   </div>
                   {this.displayMoves(workout)}
                 </div>
                 {this.workoutActions()}
               </div>
             </div>);
    }
  }

  render() {
    return(<div>
             {this.displayView()}
           </div>);
  }
}