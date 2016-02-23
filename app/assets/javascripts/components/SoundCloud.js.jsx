class SoundCloud extends React.Component {
  constructor(props){
    super(props);
    this.state = {sound_cloud: this.props.sound_cloud};
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.display = this.display.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  edit() {
    $.ajax({
      url: this.state.sound_cloud.api_url,
      type: 'PUT',
      data: {sound_cloud: {name: this.refs.name.value, url: this.refs.embed.value}}
    }).success(data => {
      this.setState({sound_cloud: data, edit: false});
    }).error(data => {
      console.log(data);
    });
  }

  delete() {
    $.ajax({
      url: this.state.sound_cloud.api_url,
      type: 'DELETE'
    }).success(data => {
      this.props.fetchSoundClouds();
    }).error(data => {
      console.log(data);
    });
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit});
  }

  display() {
    if(!this.state.edit) {
      return(<div className='card col s12 m4 blue-grey darken-1'>
               <div className='card-content white-text'>
                 <span className='card-title'>
                   {this.state.sound_cloud.name}
                 </span>
               </div>
               <div className='card-action'>
                 <a href="#" className='btn ozone-button' onClick={this.toggleEdit}>
                   <i className='fa fa-edit' />
                 </a>
                 <a href="#" className='btn red white-text' onClick={(e) => this.delete}>
                   <i className='fa fa-trash' />
                </a>
              </div>
             </div>);
    } else {
      return(<div className='card'>
                 <div className='col s12 m4'>
                   <input type='text' placeholder='Name' ref='name' required={true} defaultValue={this.state.sound_cloud.name} />
                 </div>
                 <div className='col s12 m4'>
                   <textarea className='materialize-textarea' placeholder='Embed' ref='embed' requried={true} defaultValue={this.state.sound_cloud.url}></textarea>
                 </div>
                 <div className='col s12 m4'>
                   <button onClick={this.edit} className='btn ozone-button'>Save</button>
                 </div>
               </div>)
    }
  }

  render() {
    return(<div>
             {this.display()}
           </div>);
  }
}