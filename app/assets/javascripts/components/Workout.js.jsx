class Workout extends React.Component {
  constructor(props){
    super(props);
    this.state = {edit: false, moves: [], workout: this.props.workout};
    this.displayView = this.displayView.bind(this);
    this.workoutActions = this.workoutActions.bind(this);
    this.setWorkout = this.setWorkout.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editView = this.editView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  formatTime(time) {
    return (new Date).clearTime()
                     .addSeconds(time)
                     .toString('mm:ss');
  }

  toggleEdit(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit});
  }

  workoutActions() {
    let setWorkoutHtml;
    if(this.state.workout.id != this.props.day.workout_id) {
      let today = new Date();
      if(this.props.day.id == today.getDay())
        setWorkoutHtml = <a className='btn ozone-button bottom-20' href='#' onClick={(e) => this.setWorkout(e, this.state.workout.id, this.props.day.id)}>Set As Todays Workout</a>;
    }
    return(<div className="card-action">
             {setWorkoutHtml}
             <a className='btn bottom-20' href='#' onClick={this.toggleEdit}>Edit Workout</a>
             <a className='btn red white-text bottom-20' href='#' onClick={(e) => this.props.deleteWorkout(e, this.state.workout.url)}>Delete Workout</a>
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

  deleteMoveAction(edit, col) {
    if(edit) {
      return(<button className={`${col} btn red white-text`}>Remove</button>);
    }
  }

  displayMoves(workout, edit) {
    let moves = workout.workout_moves.map( (workoutMove, index) => {
      let colClass = 'col s6';
      return(<div key={`workout-move-${index}`} className='row'>
               <div className={colClass}>
                 {workoutMove.name}
               </div>
               <div className={colClass}>
                 {workoutMove.reps}
               </div>
             </div>);
    });
    return moves;
  }

  handleEdit(e) {
    e.preventDefault();

    $.ajax({
      url: this.state.workout.url,
      type: 'PUT',
      data: {id: this.state.workout.id,
             workout: {
               min_time: this.refs.workoutMinTime.value.trim(),
               ozf_time: this.refs.workoutOzfTime.value.trim(),
               rounds: this.refs.workoutRounds.value.trim(),
               name: this.refs.workoutName.value.trim(),
               notes: this.refs.workoutNotes.value}}
    }).success(data => {
      this.setState({workout: data, edit: false});
    }).error(data => {
      console.log(data);
    });
  }

  editView() {
    if(this.state.edit) {
      let workout = this.state.workout;

      return(<div className='col s12'>
               <form onSubmit={this.handleEdit}>
                 <div className="card blue-grey darken-1">
                   <div className="card-content white-text">
                     <span className="card-title">
                       Workout Name:
                       <input type='text' defaultValue={workout.name} ref='workoutName' required='true' />
                     </span>
                     <p>
                       Min Time: 
                       <input type='text' ref='workoutMinTime' defaultValue={this.formatTime(workout.min_time)} placeholder='Workout Min Time - 01:30' pattern="\d\d:\d\d" required='true' />
                     </p>
                     <p>
                       Ozf Time: 
                       <input type='text' ref='workoutOzfTime' defaultValue={this.formatTime(workout.ozf_time)} placeholder='Workout Ozf Time - 10:00' pattern="\d\d:\d\d" required='true' />
                     </p>
                     <p>
                       Rounds: 
                       <input type='text' ref='workoutRounds' defaultValue={workout.rounds} required='true' />
                     </p>
                     <p>
                       Notes:
                       <textarea defaultValue={workout.notes} ref='workoutNotes' className='materialize-textarea'></textarea>
                     </p>
                     <div className='row'>
                       <div className='col s6'>
                         <h4>Move</h4>
                       </div>
                       <div className='col s6'>
                         <h4>Reps</h4>
                       </div>
                     </div>
                     {this.displayMoves(workout, true)}
                   </div>
                   <div className="card-action">
                     <a className='btn grey bottom-20' href='#' onClick={this.toggleEdit}>Cancel</a>
                     <button className='btn bottom-20' type='submit' >Update</button>
                   </div>
                 </div>
               </form>
             </div>)
    }
  }

  displayView() {
    if(!this.state.edit) {
      let workout = this.state.workout;

      return(<div className="col s12">
               <div className="card blue-grey darken-1">
                 <div className="card-content white-text">
                   <span className="card-title">{workout.name}</span>
                   <p>Min Time: {this.formatTime(workout.min_time)}</p>
                   <p>Ozf Time: {this.formatTime(workout.ozf_time)}</p>
                   <p>Rounds: {workout.rounds}</p>
                   <p>Number of Moves: {workout.workout_moves.length}</p>
                   <p>
                     Notes: 
                     <textarea className='materialize-textarea center' value={workout.notes}></textarea>
                   </p>
                   <div className='row'>
                     <div className='col s6'>
                       <h4>Move</h4>
                     </div>
                     <div className='col s6'>
                       <h4>Reps</h4>
                     </div>
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
             {this.editView()}
           </div>);
  }
}