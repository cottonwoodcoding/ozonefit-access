class Users extends React.Component {
  constructor(props){
    super(props);
    this.state = {users: [], loaded: false};
    this.displayUsers = this.displayUsers.bind(this);
    this.refreshUsers = this.refreshUsers.bind(this);
    this.addUser = this.addUser.bind(this);
    this.addUserForm = this.addUserForm.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
  }

  componentWillMount() {
    this.refreshUsers();
  }

  refreshUsers(workflowState = 'active') {
    $.ajax({
      url: '/api/v1/users',
      type: 'GET',
      data: {workflow_state: workflowState}
    }).success(data => {
      this.setState({users: data.users, workflowState: workflowState, loaded: true});
    }).error(data => {
      console.log(data);
    });
  }

  addUser(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/v1/users',
      type: 'POST',
      data: {user: {first_name: this.refs.firstName.value.trim(), 
                    last_name: this.refs.lastName.value.trim(), 
                    email: this.refs.email.value.trim(), 
                    phone: this.refs.phone.value.trim(),
                    trainer: this.refs.trainer.checked}}
    }).success(data => {
      let users = this.state.users;
      users.push(data);
      this.refs.firstName.value = '';
      this.refs.lastName.value = '';
      this.refs.email.value = '';
      this.refs.phone.value = '';
      this.refs.trainer.checked = false;
      this.setState({users: users});
    }).error(data => {
      console.log(data);
    });
  }

  displayUsers() {
    let currentUser = this.props.currentUser;
    if(this.state.users.length) {
      let users = this.state.users.map(user => {
          let key = `user-${user.id}`;
          return(<User key={key} user={user} refreshUsers={this.refreshUsers} currentUser={currentUser} />);
        });
      return users;
    } else {
      return(<h5 className='center'>No Users.</h5>);
    }
  }

  addUserForm() {
    if(this.state.workflowState == 'active') {
      return(<form onSubmit={this.addUser}>
               <div className='input-group'>
                 <input type='text' ref='firstName' placeholder='First Name' required='true' />
               </div>
               <div className='input-group'>
                 <input type='text' ref='lastName' placeholder='Last Name' required='true' />
               </div>
               <div className='input-group'>
                 <input type='text' ref='email' placeholder='Email' required='true' />
               </div>
               <div className='input-group'>
                 <input type='text' ref='phone' placeholder='Phone' required='true' />
               </div>
               <div className='input-group'>
                 <input type="checkbox" id="trainer_check" ref='trainer' />
                 <label htmlFor="trainer_check">Trainer?</label>
               </div>
               <br />
               <div className='input-group'>
                 <button type='submit' className='btn ozone-button'>Add</button>
               </div>
             </form>);
    }
  }

  searchUsers(term) {
    $.ajax({
      url: '/api/v1/search_users',
      type: 'GET',
      data: {term: term}
    }).success(data => {
      this.setState({users: data.users});
    }).error(data => {
      console.log(data);
    });
  }

  render() {
    if(this.state.loaded) {
      return(<div className='container'>
               <div className='center'>
                 <h5>Users</h5>
                 <h6>Expected Monthly Revenue - {this.props.revenue}</h6>
               </div>
               <div className='row'>
                 <div className='col s12'>
                   <ul className='tabs'>
                     <Tab callbackValue= 'active' text='Active Users' callback={this.refreshUsers} />
                     <Tab callbackValue='inactive' text='Inactive Users' callback={this.refreshUsers} />
                   </ul>
                 </div>
               </div>
               {this.addUserForm()}
               <div className='row'>
                 <h5 className='center'>User Search</h5>
                 <input type='text' placeholder='Search Users' onChange={(e) => this.searchUsers(e.currentTarget.value)} />
               </div>
               <div className='row card'>
                 {this.displayUsers()}
               </div>
             </div>);
    } else {
      return(<h5 className='center'>Loading...</h5>);
    }
  }
}