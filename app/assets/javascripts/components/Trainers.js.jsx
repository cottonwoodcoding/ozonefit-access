class Trainers extends React.Component {
  constructor(props){
    super(props);
    this.state = {videoUrl: this.props.trainers[0].intro_video_url};
    this.changeVideo = this.changeVideo.bind(this);
    this.displayTrainers = this.displayTrainers.bind(this);
  }

  changeVideo(url, e = null) {
    if(e){
      e.preventDefault();
    }
    this.setState({videoUrl: url});
  }

  displayTrainers() {
    let trainers = this.props.trainers.map(trainer => {
      return(<div className='row'>
               <div className='col s12'>
                 <h5>
                   <a href="#" onClick={(e) => this.changeVideo(trainer.intro_video_url, e)}>{trainer.name}</a>
                 </h5>
               </div>
             </div>);
    });
    return trainers;
  }

  render() {
    return(<div>
             <h2 className='center'>O.ZoneFit Access Trainers</h2>
             <hr />
             <div className='row center'>
               <div className='col s12 m6 center'>
                 <div className='card workout-moves'>
                   <div className='card-content'>
                     <span className='card-title black-text'>Current Trainers</span>
                     <hr />
                     {this.displayTrainers()}
                   </div>
                 </div>
               </div>
               <div className='col s12 m6'>
                 <Video videoUrl={this.state.videoUrl} />
               </div>
             </div>
           </div>);
  }
}
