class Tab extends React.Component {
  constructor(props){
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback(e = null) {
    if(e)
      e.preventDefault();
    if(this.props.callback)
      this.props.callback(this.props.callbackValue)
  }

  render() {
    return(<li className="tab col s12 m3">
             <a className='ozone-text truncate' href='#' onClick={(e) => this.callback(e)}>{this.props.text}</a>
           </li>);
  }
}