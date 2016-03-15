class WorkoutMove extends React.Component {
  constructor(props){
    super(props);
  }

  displayReps(workoutMove) {
    reps = workoutMove.reps.toString().split(' ');
    if(reps.length > 1){
      return(workoutMove.reps)
    } else {
      return(workoutMove.reps + " Reps");
    }
  }

  render() {
    let workoutMove = this.props.workoutMove;
    return(<div>
             <div className='row'>
               <div className='col s6'>
                 <h5>
                   <a href="#" onClick={(e) => this.props.changeVideo(workoutMove.url, e)}>{workoutMove.name}</a>
                 </h5>
               </div>
               <div className='col s6'>
                 <h5>
                   {this.displayReps(workoutMove)}
                </h5>
               </div>
             </div>
           </div>);
  }
}