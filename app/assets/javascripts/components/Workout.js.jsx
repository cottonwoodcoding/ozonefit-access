class Workout extends React.Component {
  constructor(props){
    super(props);
    this.state = {edit: false};
    this.displayView = this.displayView.bind(this);
    this.displayMoves = this.displayMoves.bind(this);
  }

  displayMoves() {
    let moves = this.props.workout.moves.map(move => {
      let key = `move-${move.id}`;
      return(<div key={key} className='row'>
               <div className='col s12'>
                 <div className='col s6'>
                   <div className='bold'>Move</div>
                   {move.name}
                 </div>
                 <div className='col s6'>
                   <div className='bold'>Reps</div>
                   {move.workout_moves[0].reps}
                 </div>
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
                   <p>Min Time: {workout.min_time / 60}</p>
                   <p>Rounds: {workout.rounds}</p>
                   <p>Number of Moves: {workout.moves.length}</p>
                   <hr />
                   {this.displayMoves()}
                 </div>
                 <div className="card-action">
                   <a className='btn red white-text' href='#' onClick={(e) => this.props.deleteWorkout(e, this.props.workout.url)}>Delete Workout</a>
                 </div>
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