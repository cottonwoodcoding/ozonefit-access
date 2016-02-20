class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let day = this.props.day;

    return(<div className='col s12 m4'>
             <div className="card blue-grey darken-1" onClick={() => this.props.toggleViews(day)}>
               <div className='card-content white-text'>
                 <span className='card-title'>{day.name}</span>
                 <p>Total Workouts: {day.workoutCount}</p>
               </div>
            </div>
           </div>);
  }
}
