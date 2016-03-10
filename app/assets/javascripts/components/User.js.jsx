class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {user: this.props.user, edit: false};
    this.editView = this.editView.bind(this);
    this.displayView = this.displayView.bind(this);
    this.editUser = this.editUser.bind(this);
    this.toggleUserState = this.toggleUserState.bind(this);
    this.actionButtons = this.actionButtons.bind(this);
  }

  displayView() {
    if(!this.state.edit) {
      let user = this.state.user;

      return(<div className="col s12 m4" onClick={() => this.setState({edit: !this.state.edit})}>
               <div className="card blue-grey darken-1">
                 <div className="card-content white-text">
                   <span className="card-title truncate">{user.first_name} {user.last_name}</span>
                   <p>{user.email}</p>
                   <p>{user.phone}</p>
                 </div>
               </div>
             </div>);
    }
  }

  editUser(e) {
    e.preventDefault();

    $.ajax({
      url: this.state.user.url,
      type: 'PUT',
      data: {user: {first_name: this.refs.firstName.value.trim(), last_name: this.refs.lastName.value.trim(), email: this.refs.email.value.trim(), phone: this.refs.phone.value.trim()}}
    }).success(data => {
      this.setState({edit: false, user: data});
    }).error(data => {
      console.log(data);
    });
  }

  toggleUserState(e, deleteUser = false) {
    e.preventDefault();

    let formData = {};
    if(deleteUser){
      formData = {user: {}};
    } else {
      formData = {user: {workflow_state: (this.state.user.workflow_state == 'active' ? 'inactive' : 'active')}};
    }

    $.ajax({
      url: this.state.user.url,
      type: 'DELETE',
      data: formData
    }).success(data => {
      this.setState({edit: false, user: data});
      this.props.refreshUsers();
    }).error(data => {
      console.log(data);
    });
  }

  actionButtons() {
    let user = this.state.user;
    if(user.id != this.props.currentUser.id) {
      if(user.workflow_state == 'active'){
        return(<div>
                 <button type='submit' className='btn ozone-button col s12 m6'>Save</button>
                 <button type='button' className='btn red white-text col s12 m6' onClick={(e) => this.toggleUserState(e)}>Deactivate</button>
               </div>);
      } else {
        return(<div>
                 <button type='submit' className='btn ozone-button col s12 m4'>Save</button>
                 <button type='button' className='btn green white-text col s12 m4' onClick={(e) => this.toggleUserState(e)}>Activate</button>
                 <button type='button' className='btn red white-text col s12 m4' onClick={(e) => this.toggleUserState(e, true)}>Delete</button>
               </div>);
      }
    } else {
      return(<button type='submit' className='btn ozone-button col s12'>Save</button>);
    }
  }

  editView() {
    if(this.state.edit) {
      let user = this.state.user;

      return(<div className="col s12 m4">
               <form onSubmit={this.editUser}>
                 <div className="card blue-grey darken-1">
                   <div className="card-content white-text">
                     <p>
                       <input type='text' required='true' defaultValue={user.first_name} ref='firstName' />
                     </p>
                     <p>
                       <input type='text' required='true' defaultValue={user.last_name} ref='lastName' />
                     </p>
                     <p>
                       <input type='email' required='true' defaultValue={user.email} ref='email' />
                     </p>
                     <p>
                       <input type='text' required='true' defaultValue={user.phone} ref='phone' />
                     </p>
                   </div>
                   <div className='card-action'>
                     {this.actionButtons()}
                   </div>
                   <br />
                 </div>
               </form>
             </div>);
    }
  }

  render() {
    return(<div>
             {this.editView()}
             {this.displayView()}
           </div>);
  }
}