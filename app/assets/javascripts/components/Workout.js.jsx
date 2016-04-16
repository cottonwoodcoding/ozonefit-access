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
    this.workoutHeaders = this.workoutHeaders.bind(this);
    this.removeMove = this.removeMove.bind(this);
    this.addMove = this.addMove.bind(this);
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

  removeMove(e, moveIndex) {
    e.preventDefault();
    $.ajax({
      url: this.state.workout.url,
      type: 'PUT',
      data: {id: this.state.workout.id,
             workout: this.state.workout,
             move_index: moveIndex}
    }).done(data => {
      this.setState({workout: data});
    }).fail(data => {
      console.log(data);
    });
  }

  displayMoves(workout) {
    let edit = this.state.edit;
    let moves = workout.workout_moves.map( (workoutMove, index) => {
      let colClass = edit ? 'col s4' : 'col s6';
      let removeButton = edit ? <div className={colClass}><a href='#' className='btn red' onClick={(e) => this.removeMove(e, index)}>Remove</a></div> : '';
      return(<div key={`workout-move-${index}`} className='row'>
               <div className={colClass}>
                 {workoutMove.name}
               </div>
               <div className={`${colClass} hide-on-small-only`}>
                 {workoutMove.reps}
               </div>
               {removeButton}
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

  workoutHeaders() {
    if(this.state.workout.workout_moves.length) {
      let colClass = this.state.edit ? 'col s4' : 'col s6';
      if(this.state.edit) {
        return(<div>
                 <div className={colClass}>
                   <h4>Move</h4>
                 </div>
                 <div className={`${colClass} hide-on-small-only`}>
                   <h4>Reps</h4>
                 </div>
                 <div className={colClass}>
                   <h4>Actions</h4>
                 </div>
               </div>);
      } else {
        return(<div>
                 <div className={colClass}>
                   <h4>Move</h4>
                 </div>
                 <div className={colClass}>
                   <h4>Reps</h4>
                 </div>
               </div>);
      }
    }
  }

  addMove() {
    let selectedMove = this.refs.selectedMove.value.split('-');
    let reps = this.refs.reps.value.trim();
    if(reps.length) {
      $.ajax({
        url: this.state.workout.url,
        type: 'PUT',
        data: {id: this.state.workout.id, 
               workout: this.state.workout,
               workout_move: {id: selectedMove[0], 
                              name: selectedMove[1],
                              reps: reps}}
      }).done(data => {
        this.refs.reps.value = '';
        this.setState({workout: data});
      }).fail(data => {
        console.log(data);
      });
    } else {
      alert('You have to add reps to a move!');
    }
  }

  editView() {
    if(this.state.edit) {
      let workout = this.state.workout;
       let moveOptions = this.props.moves.map(move => {
         let key = `move-option-${move.id}`;
         let moveValue = `${move.id}-${move.name}`;
         return(<option key={key} value={moveValue} >{move.name}</option>);
      }).filter(function(n){ return n != undefined }); ;

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
                       {this.workoutHeaders()}
                     </div>
                     {this.displayMoves(workout)}
                     <select className='browser-default col s12 m6 black-text' ref='selectedMove'>
                       {moveOptions}
                     </select>
                     <input className='col s12 m6' type='text' placeholder='Reps' ref='reps' />
                     <button type='button' className='btn ozone-button' onClick={this.addMove}>Add Move</button>
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

  displayNotes(notes) {
    if(notes) {
      return(<p className='center'>
               Notes:
               <br />
               {notes}
             </p>)
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
                   <div>
                     {this.displayNotes(workout.notes)}
                   </div>
                   <div className='row'>
                     {this.workoutHeaders()}
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