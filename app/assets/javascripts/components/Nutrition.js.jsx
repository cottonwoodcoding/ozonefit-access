class Nutrition extends React.Component {
  constructor(props){
    super(props);
    this.state = {edit: false};
    this.editView = this.editView.bind(this);
    this.editNutrition = this.editNutrition.bind(this);
    this.deleteNutrition = this.deleteNutrition.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
    this.displayView = this.displayView.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  editView() {
    if(this.state.edit) {
      let nutrition = this.props.nutrition;

      return(<div className='col s4'>
               <form onSubmit={(e) => this.editNutrition(e, nutrition.id)}>
                 <div className='card blue-grey darken-1'>
                   <div className='card-content white-text'>
                       <p>
                         <textarea className='materialize-textarea' required='true' defaultValue={nutrition.embedUrl} ref='embedUrl'></textarea>
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
    return(<a href="#" className='btn red white-text' onClick={(e) => this.deleteNutrition(e, id)}>
             <i className='fa fa-trash' />
           </a>);
  }

  deleteNutrition(e, nutritionId) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/nutritions/' + nutritionId,
      type: 'DELETE'
    }).success(data => {
      this.props.refreshNutritions();
    }).error(data => {
      console.log(data);
    });
  }

  editNutrition(e, nutritionId) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/nutritions/' + nutritionId,
      type: 'PUT',
      data: {nutrition: {embedUrl: this.refs.embedUrl.value.trim()}}
    }).success(data => {
      this.setState({edit: false});
      this.props.refreshNutritions();
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
      let nutrition = this.props.nutrition;

      return(<div className='row'>
               <div className='col s4'>
                 <div className="card blue-grey darken-1">
                   <div className='card-content white-text'>
                     <span className='card-title'>Nutrition</span>
                     <p className='truncate'>{nutrition.embedUrl}</p>
                   </div>
                   <div className='card-action'>
                     <a href="#" className='btn ozone-button' onClick={this.toggleEdit}>
                       <i className='fa fa-edit' />
                     </a>
                     {this.deleteAction(nutrition.id)}
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