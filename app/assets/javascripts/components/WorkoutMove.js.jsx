class WorkoutMove extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let workoutMove = this.props.workoutMove;
    let moveData = this.props.moveData;
    return(<div>
             <div className='row'>
               <div className='col s6'>
                 <h5>
                   <a href="#" onClick={(e) => this.props.changeVideo(workoutMove.url, e)}>{workoutMove.name}</a>
                 </h5>
               </div>
               <div className='col s6'>
                 <h5>
                   {moveData.reps} Reps
                </h5>
               </div>
             </div>
           </div>);
  }
}