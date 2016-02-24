class Motivation extends React.Component {
  constructor(props){
    super(props);
    this.state = {edit: false};
    this.editView = this.editView.bind(this);
    this.editMotivation = this.editMotivation.bind(this);
    this.deleteMotivation = this.deleteMotivation.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
    this.displayView = this.displayView.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  editView() {
    if(this.state.edit) {
      let motivation = this.props.motivation;

      return(<div className='col s4'>
               <form onSubmit={(e) => this.editMotivation(e, motivation.id)}>
                 <div className='card blue-grey darken-1'>
                   <div className='card-content white-text'>
                       <p>
                         <textarea className='materialize-textarea' required='true' defaultValue={motivation.text} ref='motivationText'></textarea>
                       </p>  
                   </div>
                   <div className='card-action'>
                     <button type='submit' className='btn ozone-button'>Save</button>
                   </div>
                 </div>
               </form>
             </div>);
    }
  }

  deleteAction(id) {
    if(id != 1) {
      return(<a href="#" className='btn red white-text' onClick={(e) => this.deleteMotivation(e, id)}>
               <i className='fa fa-trash' />
             </a>);
    }
  }

  deleteMotivation(e, motivationId) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/motivations/' + motivationId,
      type: 'DELETE'
    }).success(data => {
      this.props.refreshMotivations();
    }).error(data => {
      console.log(data);
    });
  }

  editMotivation(e, motivationId) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/motivations/' + motivationId,
      type: 'PUT',
      data: {motivation: {text: this.refs.motivationText.value.trim()}}
    }).success(data => {
      this.setState({edit: false});
      this.props.refreshMotivations();
    }).error(data => {
      console.log(data);
    });
  }

  toggleEdit(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit});
  }

  displayView() {
    if(!this.state.edit) {
      let motivation = this.props.motivation;

      return(<div className='row'>
               <div className='col s4'>
                  <div className="card blue-grey darken-1">
                    <div className='card-content white-text'>
                      <span className='card-title'>Motivation Quote</span>
                      <p className='truncate'>{motivation.text}</p>
                    </div>
                    <div className='card-action'>
                      <a href="#" className='btn ozone-button' onClick={this.toggleEdit}>
                        <i className='fa fa-edit' />
                      </a>
                      {this.deleteAction(motivation.id)}
                    </div>
                 </div>
                </div>
              </div>);
    }
  }

  render() {
    return(<div>
             {this.displayView()}
             {this.editView()}
           </div>);
  }
}