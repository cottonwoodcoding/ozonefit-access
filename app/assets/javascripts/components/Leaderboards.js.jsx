class Leaderboards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {boardsDisplay: true};
    this.renderLeaderboads = this.renderLeaderboards.bind(this);
    this.showParticipants = this.showParticipants.bind(this);
    this.toggleParticipants = this.toggleParticipants.bind(this);
  }

  toggleParticipants(date, participants) {
    this.setState({boardsDisplay: !this.state.boardsDisplay, participants: participants, leaderboardTitle: date});
  }

  titleize(value) {
    let string = value.toString();
    return string.toString().charAt(0).toUpperCase() + string.slice(1)
  }

  showParticipants() {
    let participants = this.state.participants.map(participant => {
      return({id: participant.user.id, name: `${participant.user.first_name} ${participant.user.last_name}`, time: participant.workout_time.time, ozf: this.titleize(participant.workout_time.ozf), profile_url: participant.avatar_url });
    });
    return(<Leaderboard leaders={participants} title={this.state.leaderboardTitle} />);

  }

  renderLeaderboards() {
    let leaderboardKeys = Object.keys(this.props.leaderboards);
    if(leaderboardKeys.length) {
      let leadboardContainers = leaderboardKeys.map(key => {
        let leaderboard = this.props.leaderboards[key];
        return(<LeaderboardContainer key={key} date={key} workoutTimes={leaderboard} toggleParticipants={this.toggleParticipants}/>);
      });
      return(leadboardContainers);
    } else {
      return(<h4>No Leaderboards Yet.</h4>);
    }
  }

  render() {
    if(this.state.boardsDisplay) {
      return(<div>
               <h2 className='center'>{this.props.year} Leaderboards</h2>
               <hr />
               <div className='row'>
                 {this.renderLeaderboards()}
               </div>
             </div>);
    } else {
      return(<div>
               <br />
               <div className='center'>
                 <button type='button' className='btn ozone-button white-text' onClick={this.toggleParticipants}>Leaderboards</button>
               </div>
               {this.showParticipants()}
             </div>);
    }
  }
}
