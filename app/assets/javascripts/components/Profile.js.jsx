class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {user: this.props.user, tab: 'info', avatarUrl: this.props.avatar_url};
    this.saveAccountInfo = this.saveAccountInfo.bind(this);
    this.resetAccountForm = this.resetAccountForm.bind(this);
    this.handleAccountSubmit = this.handleAccountSubmit.bind(this);
    this.display = this.display.bind(this);
    this.tabState = this.tabState.bind(this);
    this.setAvatarUrl = this.setAvatarUrl.bind(this);
  }

  display() {
    switch(this.state.tab){
      case 'info':
        return(<AccountInfo handleAccountSubmit={this.handleAccountSubmit} user={this.state.user} />);
        break;
      case 'profile':
        return(<div>
                 <div className="center-align col s12 m6">
                   <h3>Total Number Of Workouts Completed:</h3>
                   <h5>{this.props.total_workouts}</h5> 
                 </div>
                 <div className="center-align col s12 m6">
                   <Avatar avatarUrl={this.state.avatarUrl} setAvatarUrl={this.setAvatarUrl} />
                 </div>
               </div>);
        break;
      case 'measurements':
        return(<Measurements user={this.state.user} />);
        break;
      default:
        this.setState({tab: 'info'});
    }
  }

  setAvatarUrl(url) {
    this.setState({avatarUrl: url});
  }

  resetAccountForm() {
    this.refs.firstName.value = this.state.user.first_name;
    this.refs.lastName.value = this.state.user.last_name;
    this.refs.email.value = this.state.user.email;
  }

  saveAccountInfo(formData) {
    $.ajax('/api/v1/update_account', {
      type: 'PUT',
      data: formData})
      .success(data => {
        this.setState({user: data.user});
        this.showAjaxMessage('Profile Saved!', 'notice');
      })
      .error(data => {
        this.showAjaxMessage(JSON.parse(data.responseText).errors, 'error');
        this.resetForm();
      }
    );
  }

  handleAccountSubmit(e, refs){
    e.preventDefault();
    let password = refs.password.value;
    let passwordConfirmation = refs.passwordConfirm.value;
    let formData = {user: {first_name: refs.firstName.value.trim(),
                    last_name: refs.lastName.value.trim(),
                    email: refs.email.value.trim()}};
    if(password.length && passwordConfirmation.length) {
      formData.user.password = password;
      formData.user.password_confirmation = passwordConfirmation;
    }
    this.saveAccountInfo(formData);
    return false;
  }

  tabState(tab) {
    this.setState({tab: tab});
  }

  render() {
    return(<div>
             <div className="center-align">
               <h3>Profile for {this.state.user.first_name} {this.state.user.last_name}</h3>
               <a href="/" className="btn ozone-button">Dashboard</a>
               <hr />
             </div>
             <div className="row">
               <div className="col s12">
                 <ul className="tabs">
                   <Tab callbackValue='info' text='Account Info' callback={this.tabState} />
                   <Tab callbackValue='profile' text='Profile' callback={this.tabState} />
                   <Tab callbackValue='measurements' text='Measurements' callback={this.tabState} />
                 </ul>
               </div>
               <div className="col s12 card">
                {this.display()}
               </div>
             </div>
           </div>);
  }
}