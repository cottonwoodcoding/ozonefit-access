class Motivation extends React.Component {
  constructor(props){
    super(props);
    this.setEdit = this.setEdit.bind(this);
    this.deleteMotivation = this.deleteMotivation.bind(this);
  }

  setEdit() {

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

  render() {
    let motivation = this.props.motivation;

    return(<div className='col s12'>
             <div className="card blue-grey darken-1">
               <div className='card-content white-text'>
                 <span className='card-title'>Motivation</span>
                 <p className='truncate'>{motivation.text}</p>
               </div>
               <div className='card-action'>
                 <a href="#" className='btn ozone-button' onClick={this.setEdit}>
                   <i className='fa fa-edit' />
                 </a>
                 <a href="#" className='btn red white-text' onClick={(e) => this.deleteMotivation(e, motivation.id)}>
                   <i className='fa fa-trash' />
                 </a>
               </div>
            </div>
           </div>);
  }
}