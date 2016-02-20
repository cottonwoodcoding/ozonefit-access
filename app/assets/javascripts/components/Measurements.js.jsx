class Measurements extends React.Component{
  constructor(props){
    super(props);
    this.state = {measurements: [], loaded: false};
    this.renderMeasurements = this.renderMeasurements.bind(this);
  }

  componentDidMount() {
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
      return(<Measurement key={key} measurement={measurement} />);
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
              <th>Ozone Challenge Time</th>
              <th>Measurement Date</th>
              <th>Weight</th>
              <th>Body Fat Percentage</th>
              <th>Waist</th>
              <th>Right Bicep</th>
              <th>Left Bicep</th>
              <th>Right Thigh</th>
              <th>Left Thigh</th>
              <th>Waist</th>
              <th>Right Calf</th>
              <th>Left Calf</th>
              <th>Chest</th>
              <th>Neck</th>
            </tr>
          </thead>
          <tbody>
            {this.renderMeasurements()}
          </tbody>
        </table>
        </div>
      );
    else if(this.state.loaded && this.state.measurements.length == 0)
      return(<h3 className="center">No Measurements Yet, Keep Working Hard!</h3>);
    else
      return(<h3 className='center'>Loading</h3>);
  }
}