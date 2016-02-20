class FileForm extends React.Component {
  constructor(props){
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleFile(e) {
    let self = this;
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = function(upload) {
      $.ajax({
        url: '/api/v1/upload_avatar',
        type: 'PUT',
        data: {profile: {avatar: upload.target.result}}
      }).success(data => {
        self.props.setAvatarUrl(data.avatar_url);
      }).error(data => {
        console.log(data);
      });
    }
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <div className="file-field input-field">
          <div className="btn ozone-button">
            <span>Change Picture</span>
            <input type="file" onChange={this.handleFile} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </form>
    );
  }
}