class Admin extends React.Component {
  constructor(props){
    super(props);
    this.state = {tab: 'users'};
    this.display = this.display.bind(this);
    this.tabState = this.tabState.bind(this);
  }

  display() {
    switch(this.state.tab){
      case 'users':
        return(<Users workflowState='active' currentUser={this.props.current_user} revenue={this.props.revenue} />);
        break;
      case 'days':
        return(<Days />);
        break;
      case 'moves':
        return(<Moves />);
        break;
      case 'measurements':
        return(<AdminMeasurements />);
        break;
      case 'soundcloud':
        return(<SoundClouds />);
        break;
      case 'motivation':
        return(<AdminMotivations />);
        break;
      case 'nutrition':
        return(<Nutritions />)
      default:
        this.setState({tab: 'users'});
    }
  }

  tabState(tab) {
    this.setState({tab: tab});
  }

  render() {
    if(this.props.current_user.admin) {
      return(<div>
               <ul className="tabs">
                 <Tab callbackValue='users' text='Users' callback={this.tabState} />
                 <Tab callbackValue='motivation' text='Motivation' callback={this.tabState} />
                 <Tab callbackValue='nutrition' text='Nutrition' callback={this.tabState} />
                 <Tab callbackValue='days' text='Workouts' callback={this.tabState} />
                 <Tab callbackValue='moves' text='Moves' callback={this.tabState} />
                 <Tab callbackValue='measurements' text='Measurements' callback={this.tabState} />
                 <Tab callbackValue='soundcloud' text='SoundCloud' callback={this.tabState} />
               </ul>
               <div className="col s12 card">
                <br />
                {this.display()}
               </div>
             </div>);
    } else {
      return(<div>
               <ul className="tabs">
                 <Tab callbackValue='motivation' text='Motivation' callback={this.tabState} />
                 <Tab callbackValue='nutrition' text='Nutrition' callback={this.tabState} />
                 <Tab callbackValue='measurements' text='Measurements' callback={this.tabState} />
                 <Tab callbackValue='soundcloud' text='SoundCloud' callback={this.tabState} />
               </ul>
               <div className="col s12 card">
                <br />
                {this.display()}
               </div>
             </div>);
    }
  }
}