class Measurement extends React.Component{
  constructor(props){
    super(props);
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
      </tr>
    );
  }
}