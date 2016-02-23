class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="row">
        <form className="col s12" onSubmit={(e) => this.props.handleAccountSubmit(e, this.refs)}>
          <div className="row">
            <div className="input-field col s12 m6">
              <input id="first_name" type="text" ref="firstName" placeholder="First Name" defaultValue={this.props.user.first_name} />
            </div>
            <div className="input-field col s12 m6">
              <input id="last_name" type="text" ref="lastName" placeholder="Last Name" defaultValue={this.props.user.last_name} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m6">
              <input id="email" autoFill="off" type="email" placeholder="Email" ref="email" defaultValue={this.props.user.email} />
            </div>
            <div className="input-field col s12 m6">
              <input id="phone" autoFill="off" type="text" placeholder="Phone" ref="phone" defaultValue={this.props.user.phone} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col m6 s12">
              <input id="password" type="password" placeholder="Password" ref="password" />
            </div>
            <div className="row">
              <div className="input-field col m6 s12">
                <input id="password_confirm" type="password" placeholder="Password Confirm" ref="passwordConfirm" />
              </div>
            </div>
          </div>
          <div className="center-align">
            <input type="submit" value="Save" className="btn ozone-button" />
          </div>
        </form>
    </div>);
  }
}