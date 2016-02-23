class Workout extends React.Component {
  constructor(props){
    super(props);
    this.state = {edit: false};
    this.displayView = this.displayView.bind(this);
    this.displayMoves = this.displayMoves.bind(this);
  }

  displayMoves() {
    let moves = this.props.workout.moves.map(move => {
      let correctWorkoutMove = null;
      move.workout_moves.forEach(workoutMove => {
        if(workoutMove.workout_id == this.props.workout.id)
          correctWorkoutMove = workoutMove
      });
      let key = `move-${move.id}`;
      return(<div key={key} className='row'>
               <div className='col s12'>
                 <div className='col s6'>
                   <div className='bold'>Move</div>
                   {move.name}
                 </div>
                 <div className='col s6'>
                   <div className='bold'>Reps</div>
                   {correctWorkoutMove.reps}
                 </div>
               </div>
             </div>);
    });
    return moves;
  }

  formatTime(time) {
    return (new Date).clearTime()
                     .addSeconds(time)
                     .toString('mm:ss');
  }

  deleteAction() {
    if(this.props.workout.id != this.props.day.workout_id) {
      return(<div className="card-action">
               <a className='btn red white-text' href='#' onClick={(e) => this.props.deleteWorkout(e, this.props.workout.url)}>Delete Workout</a>
             </div>);
    }
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
                   <p>Number of Moves: {workout.moves.length}</p>
                   <hr />
                   {this.displayMoves()}
                 </div>
                 {this.deleteAction()}
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