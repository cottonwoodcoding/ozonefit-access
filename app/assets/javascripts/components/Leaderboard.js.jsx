class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLeaders() {
    if(this.props.leaders.length) {
      let index = 0;
      let leaderBoard = this.props.leaders.map(leader => {
        let key = `leader-${leader.id}-${index}`;
        index = index + 1;
        return(<div key={key} className='row'>
          <div className='col m3 hide-on-small-only'>
            <p>
              <img src={leader.profile_url} alt="Profile Image" className="circle responsive-img leaderboard-avatar" />
            </p>
          </div>
          <div className='col s4 m3'>
            <h5 className="bold">Name</h5>
            <h5>{leader.name}</h5>
          </div>
          <div className='col s4 m3'>
            <h5 className="bold">Time</h5>
            <h5>{leader.time}</h5>
          </div>
          <div className='col s4 m3'>
            <h5 className="bold">OZF</h5>
            <h5>{leader.ozf}</h5>
          </div>
        </div>);
      });
      return leaderBoard;
    } else {
      return(<h4>No Leaders Yet. Start The Workout!</h4>);
    }
  }

  render() {
    return(
      <div className="card">
        <div className='container center'>
          <h4>{this.props.title}</h4>
          <hr />
          {this.renderLeaders()}
        </div>
      </div>);
  }
}
