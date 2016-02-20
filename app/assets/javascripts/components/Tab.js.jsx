class Tab extends React.Component {
  constructor(props){
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback() {
    if(this.props.callback)
      this.props.callback(this.props.callbackValue)
  }

  render() {
    return(<li className="tab col s3">
             <a className='ozone-text truncate active' href='#' onClick={this.callback}>{this.props.text}</a>
           </li>);
  }
}