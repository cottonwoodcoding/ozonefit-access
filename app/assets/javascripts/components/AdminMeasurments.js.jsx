class AdminMeasurements extends React.Component {
  constructor(props){
    super(props);
    this.state = {loaded: false};
    this.userOptions = this.userOptions.bind(this);
    this.setUser = this.setUser.bind(this);
    this.measurementForm = this.measurementForm.bind(this);
    this.submitMeasurement = this.submitMeasurement.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/api/v1/users',
      type: 'GET',
      data: {workflow_state: 'active'}
    }).success(data => {
      this.setState({users: data.users, loaded: true});
    }).error(data => {
      console.log(data);
    });
  }

  userOptions() {
    let userOptions = this.state.users.map(user => {
      let key = `user-option-${user.id}`;
      return(<option key={key} value={user.id}>{user.first_name} {user.last_name}</option>);
    });
    return userOptions;
  }

  setUser(userId) {
    this.setState({measurementUser: userId})
  }

  submitMeasurement(e) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/users/'+this.state.measurementUser+'/measurements',
      type: 'POST',
      data: {user_id: this.state.measurmentUser, 
             measurement: {weight: this.refs.weight.value, chest: this.refs.chest.value,
                           left_bicep: this.refs.leftBicep.value, neck: this.refs.neck.value, 
                           waist: this.refs.waist.value, left_thigh: this.refs.leftThigh.value,
                           left_calf: this.refs.leftCalf.value, fat_percent: this.refs.fat.value, 
                           notes: this.refs.notes.value}}
    }).success(data => {
      this.refs.userSelect.selectedIndex = 0;
      this.setState({measurementUser: null, alert: 'Measurement Added Successfully'});
    }).error(data => {
      console.log(data);
    });
  }

  measurementForm() {
    if(this.state.measurementUser){
      return(<form onSubmit={this.submitMeasurement}>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' placeholder="Weight" ref="weight" />
                 </div>
               </div>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' placeholder="Chest" ref="chest" />
                 </div>
               </div>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' placeholder="Left Bicep" ref="leftBicep" />
                 </div>
               </div>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' placeholder="Neck" ref="neck" />
                 </div>
               </div>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' placeholder="Waist" ref="waist" />
                 </div>
               </div>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' placeholder="Left Thigh" ref="leftThigh" />
                 </div>
               </div>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' placeholder="Left Calf" ref="leftCalf" />
                 </div>
               </div>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' placeholder="Body Fat" ref="fat" />
                 </div>
               </div>
               <div className='row'>
                 <div className='input-field'>
                   <textarea placeholder="Notes" className='materialize-textarea' ref="notes" />
                 </div>
               </div>
               <div className='row center'>
                 <button type='submit' className='btn ozone-button'>Save</button>
               </div>
             </form>)
    }
  }

  alert() {
    if(this.state.alert) {
      return(<div className='center green white-text'>
               {this.state.alert}
             </div>);
    }
  }

  render() {
    if(this.state.loaded) {
      return(<div>
               {this.alert()}
               <h5 className='center'>Select a User</h5>
               <select className='browser-default' ref='userSelect' onChange={(e) => this.setUser(e.currentTarget.value)}>
                 <option value=''>-- User</option>
                 {this.userOptions()}
               </select>
               {this.measurementForm()}
             </div>);
    } else {
      return(<h5 className='center'>Loading...</h5>);
    }
  }
}