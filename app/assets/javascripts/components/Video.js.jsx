class Video extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(<div className='video-container' dangerouslySetInnerHTML={{__html: this.props.videoUrl}}>
           </div>);
  }
}