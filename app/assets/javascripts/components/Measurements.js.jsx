class Measurements extends React.Component{
  constructor(props){
    super(props);
    this.state = {measurements: [], loaded: false};
    this.renderMeasurements = this.renderMeasurements.bind(this);
    this.fetchMeasurments = this.fetchMeasurments.bind(this);
  }

  componentDidMount() {
    this.fetchMeasurments();
  }

  fetchMeasurments() {
    $.ajax({
      url: '/api/v1/users/'+this.props.user.id+'/measurements',
      type: 'GET'
    }).success(data => {
      this.setState({measurements: data.measurements, loaded: true});
    }).error(data => {
      console.log(data);
    });
  }

  renderMeasurements() {
    let measurements = this.state.measurements.map(measurement => {
      let key = `measurment-${measurement.id}`;
      return(<Measurement fetchMeasurments={this.fetchMeasurments} key={key} measurement={measurement} editable={this.props.editable} />);
    });
    return measurements;
  }

  render() {
    if(this.state.loaded && this.state.measurements.length)
      return(
        <div className="col s12">
        <table className="highlight striped responsive-table">
          <thead className="white">
            <tr>
              <th>Measurement Date</th>
              <th>Weight</th>
              <th>Body Fat Percentage</th>
              <th>Waist</th>
              <th>Left Bicep</th>
              <th>Left Thigh</th>
              <th>Waist</th>
              <th>Left Calf</th>
              <th>Chest</th>
              <th>Neck</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {this.renderMeasurements()}
          </tbody>
        </table>
        </div>
      );
    else if(this.state.loaded && this.state.measurements.length == 0)
      return(<h3 className="center">No Measurements Yet.</h3>);
    else
      return(<h3 className='center'>Loading</h3>);
  }
}