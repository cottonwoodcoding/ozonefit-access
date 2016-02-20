class SoundClouds extends React.Component {
  constructor(props){
    super(props);
    this.state = {sound_clouds: []};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.display = this.display.bind(this);
    this.fetchSoundClouds = this.fetchSoundClouds.bind(this);
  }

  componentWillMount() {
    this.fetchSoundClouds();
  }

  fetchSoundClouds() {
    $.ajax({
      url: '/api/v1/sound_clouds',
      type: 'GET'
    }).success(data => {
      this.setState({sound_clouds: data.sound_clouds});
    }).error(data => {
      console.log(data);
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/sound_clouds',
      type: 'POST',
      data: {sound_cloud: {name: this.refs.name.value, url: this.refs.embed.value}}
    }).success(data => {
      let sound_clouds = this.state.sound_clouds;
      sound_clouds.push(data);
      this.refs.name.value = '';
      this.refs.embed.value = '';
      this.setState({sound_clouds: sound_clouds});
    }).error(data => {
      console.log(data);
    });
  }

  display() {
    if(this.state.sound_clouds.length) {
      let sound_clouds = this.state.sound_clouds.map(sound_cloud => {
        let key = `key-${sound_cloud.id}`;
        return(<SoundCloud key={key} sound_cloud={sound_cloud} fetchSoundClouds={this.fetchSoundClouds} />);
      });
      return sound_clouds;
    } else {
      return(<h5 className='center'>No SoundClouds</h5>);
    }
  }

  render() {
    return(<div>
             <h5 className='center'>SoundCloud For Workouts</h5>
             <form onSubmit={this.handleSubmit}>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' required='true' ref='name' placeholder="Name" />
                 </div>
               </div>
               <div className='row'>
                 <div className='input-field'>
                   <input type='text' required='true' ref='embed' placeholder="Embed" />
                 </div>
               </div>
               <button type='submit' className='btn ozone-button'>Add</button>
             </form>
             <br />
             {this.display()}
           </div>);
  }
}