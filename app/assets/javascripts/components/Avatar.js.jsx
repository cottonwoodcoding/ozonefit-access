class Avatar extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <h3>User Avatar</h3>
        <img id="user_avatar" src={this.props.avatarUrl} alt="User Avatar" className="responsive-img circle leaderboard-avatar" />
        <br />
        <FileForm setAvatarUrl={this.props.setAvatarUrl} />
      </div>
    );
  }
}