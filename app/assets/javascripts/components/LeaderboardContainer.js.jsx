class LeaderboardContainer extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let formattedDate = moment(this.props.date).format('dddd, MMMM Do');
    return(<div>
             <div className='col s4 pointer' onClick={() => this.props.toggleParticipants(formattedDate, this.props.workoutTimes)}>
               <div className='card'>
                 <div className='valign-wrapper leaderboard-container'>
                   <h4 className='ozone-text valign center-container'>{formattedDate}</h4>
                 </div>
                 <h6 className='center'>Number of Participants: {this.props.workoutTimes.length}</h6>
               </div>
             </div>
           </div>);
  }
}