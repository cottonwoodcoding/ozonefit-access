class Avatar extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <img id="user_avatar" src={this.props.avatarUrl} alt="User Avatar" className="responsive-img" />
        <br />
        <FileForm setAvatarUrl={this.props.setAvatarUrl} />
      </div>
    );
  }
}