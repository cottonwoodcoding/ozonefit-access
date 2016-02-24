class Workouts extends React.Component {
  constructor(props){
    super(props);
    this.state = {workouts: [], showWorkoutForm: false, movesToAdd: [], loaded: false};
    this.showWorkoutForm = this.showWorkoutForm.bind(this);
    this.displayWorkouts = this.displayWorkouts.bind(this);
    this.workoutForm = this.workoutForm.bind(this);
    this.addWorkout = this.addWorkout.bind(this);
    this.addMove = this.addMove.bind(this);
    this.moveExists = this.moveExists.bind(this);
    this.showMoveOptions = this.showMoveOptions.bind(this);
    this.removeMove = this.removeMove.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
    this.getWorkouts = this.getWorkouts.bind(this);
    this.addWorkoutButton = this.addWorkoutButton.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: '/api/v1/moves',
      type: 'GET'
    }).success(data => {
      this.setState({moves: data.moves});
    }).error(data => {
      console.log(data);
    });
    this.getWorkouts();
  }

  getWorkouts() {
    $.ajax({
      url: '/api/v1/days/'+this.props.day.id+'/workouts',
      type: 'GET'
    }).success(data => {
      this.setState({workouts: data.workouts, loaded: true});
    }).error(data => {
      console.log(data);
    });
  }

  displayWorkouts() {
    if(this.state.workouts.length) {
      let workouts = this.state.workouts.map(workout => {
        let key = `workout-${workout.id}`;
        return(<Workout day={this.props.day} key={key} workout={workout} deleteWorkout={this.deleteWorkout} getDays={this.props.getDays} />);
      });
      return workouts;
    } else {
      return(<h5 className='center'>No Workouts.</h5>);
    }
  }

  deleteWorkout(e, url) {
    e.preventDefault();

    $.ajax({
      url: url,
      type: 'DELETE'
    }).success(data => {
      this.getWorkouts();
    }).error(data => {
      console.log(data);
    });
  }

  addWorkout(e) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/days/'+this.props.day.id+'/workouts',
      type: 'POST',
      data: {workout: {min_time: this.refs.workoutMinTime.value, ozf_time: this.refs.workoutOzfTime.value, rounds: this.refs.rounds.value}, moves: this.state.movesToAdd}
    }).success(data => {
      let workouts = this.state.workouts;
      workouts.push(data);
      this.setState({workouts: workouts, showWorkoutForm: false, movesToAdd: []});
    }).error(data => {
      console.log(data);
    });
  }

  addMove() {
    let movesToAdd = this.state.movesToAdd;
    let values = this.refs.selectedMove.value.split('-');
    if(values.length == 2 && this.refs.reps.value.length) {
      movesToAdd.push({id: values[0], name: values[1], reps: this.refs.reps.value});
      this.refs.reps.value = '';
      this.setState({movesToAdd: movesToAdd});
    }
  }

  removeMove(moveId) {
    let movesToAdd = this.state.movesToAdd.filter(function (move) {
      return move.id != moveId;
    });
    this.setState({movesToAdd: movesToAdd});
  }

  moveExists(moveId) {
    let exists = false;
    for(let i = 0; i < this.state.movesToAdd.length; i++){
      let moveData = this.state.movesToAdd[i];
      if(moveData && moveData.id == parseInt(moveId)){
        exists = true;
        break;
      }
    }
    return exists;
  }

  showMoves() {
    let addedMoves = this.state.movesToAdd.map(move => {
      let key = `move-${move.id}`;
      return(<div key={key} className='row'>
               <div className='col s12'>
                 <div className='col s4'>
                   <div className='bold'>Move</div>
                   {move.name}
                 </div>
                 <div className='col s4'>
                   <div className='bold'>Reps</div>
                   {move.reps}
                 </div>
                 <div className='col s4'>
                   <button type='button' className='btn ozone-button' onClick={() => this.removeMove(move.id)}>Remove</button>
                 </div>
               </div>
             </div>);
    });
    return addedMoves;
  }

  showMoveOptions(moveOptions) {
    if(moveOptions.length) {
      return(<div className='row'>
        <div className='input-field col s12'>
          <select className='browser-default col s12 m6' ref='selectedMove'>
            <option value=''>-- Move</option>
            {moveOptions}
          </select>
          <input className='col s12 m6' type='text' placeholder='Reps' ref='reps' />
          <button type='button' onClick={this.addMove} className='btn ozone-button'>Add Move</button>
        </div>
      </div>);
    }
  }

  workoutForm() {
    if(this.state.showWorkoutForm) {
       let moveOptions = this.state.moves.map(move => {
         let key = `move-option-${move.id}`;
         if(!this.moveExists(move.id)){
           let moveValue = `${move.id}-${move.name}`;
           return(<option key={key} value={moveValue} >{move.name}</option>);
         }
      }).filter(function(n){ return n != undefined }); ;

      return(<div className='row'>
               <form className='col s12' onSubmit={this.addWorkout}>
                 <div className='row'>
                   <div className='input-field col s12'>
                     <input type='text' ref='workoutMinTime' placeholder='Workout Min Time - 01:30' pattern="\d\d:\d\d" required='true' />
                   </div>
                 </div>
                 <div className='row'>
                   <div className='input-field col s12'>
                     <input type='text' ref='workoutOzfTime' placeholder='Workout Ozf Time - 10:00' pattern="\d\d:\d\d" required='true' />
                   </div>
                 </div>
                 <div className='row'>
                   <div className='input-field col s12'>
                     <input type='number' ref='rounds' min='1' step='1' placeholder='Workout Rounds' required='true' />
                   </div>
                 </div>
                 <div className='row'>
                   {this.showMoves()}
                 </div>
                 {this.showMoveOptions(moveOptions)}
                 <div className='row'>
                   <button type='submit' className='btn ozone-button'>Add Workout</button>
                 </div>
               </form>
             </div>);
    }
  }

  showWorkoutForm() {
    this.setState({showWorkoutForm: !this.state.showWorkoutForm});
  }

  addWorkoutButton() {
    if(this.state.moves.length)
      return(<button className="btn ozone-button" onClick={this.showWorkoutForm}>Add Workout</button>);
  }

  render() {
    if(this.state.loaded) {
      return(<div className='center'>
               <h4>{this.props.day.name} Workouts</h4>
               <button type='button' className='btn grey white-text' onClick={this.props.getDays}>Back</button>
               &nbsp;
               {this.addWorkoutButton()}
               {this.workoutForm()}
               <div className='row'>
                 {this.displayWorkouts()}
               </div>
             </div>);
    } else {
      return(<h5 className='center'>Loading...</h5>);
    }
  }
}