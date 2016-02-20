class Days extends React.Component {
  constructor(props) {
    super(props);
    this.state = {days: [], loaded: false};
    this.display = this.display.bind(this);
    this.toggleViews = this.toggleViews.bind(this);
    this.getDays = this.getDays.bind(this);
  }

  componentWillMount() {
    this.getDays()
  }

  getDays(displayWorkouts = false) {
    $.ajax({
      url: '/api/v1/days',
      type: 'GET'
    }).success(data => {
      this.setState({days: data.days, loaded: true, displayWorkouts: false});
    }).error(data => {
      console.log(data);
    });
  }

  toggleViews(day) {
    this.setState({displayWorkouts: !this.state.displayWorkouts, day: day});
  }

  display() {
    if(this.state.displayWorkouts) {
      return(<Workouts day={this.state.day} getDays={this.getDays} />);
    } else {
      let days = this.state.days.map(day => {
        let key = `day-${day.id}`;
        return(<Day key={key} day={day} toggleViews={this.toggleViews} />); 
      });
      return days;
    }
  }

  render() {
    if(this.state.loaded) {
      return(<div>
              {this.display()}
             </div>);
    } else {
      return(<h5 className='center'>Loading...</h5>);
    }
  }
}
