class Measurement extends React.Component{
  constructor(props){
    super(props);
    this.deleteMeasurement = this.deleteMeasurement.bind(this);
  }

  deleteMeasurementAction() {
    if(this.props.editable) {
    return(<td>
             <button className='btn red' onClick={this.deleteMeasurement}>Delete</button>
           </td>);
    }
  }

  deleteMeasurement() {
    $.ajax({
      url: this.props.measurement.url,
      type: 'DELETE'
    }).success(data => {
      this.props.fetchMeasurments();
    }).error(data => {
      console.log(data);
    })
  }

  render() {
    return(
      <tr>
        <td>{this.props.measurement.created_at}</td>
        <td>{this.props.measurement.weight}</td>
        <td>{this.props.measurement.fat_percent}%</td>
        <td>{this.props.measurement.waist}</td>
        <td>{this.props.measurement.left_bicep}</td>
        <td>{this.props.measurement.left_thigh}</td>
        <td>{this.props.measurement.waist}</td>
        <td>{this.props.measurement.left_calf}</td>
        <td>{this.props.measurement.chest}</td>
        <td>{this.props.measurement.neck}</td>
        <td>{this.props.measurement.notes}</td>
        {this.deleteMeasurementAction()}
      </tr>
    );
  }
}