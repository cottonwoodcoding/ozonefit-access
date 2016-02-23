class Move extends React.Component {
  constructor(props){
    super(props);
    this.state = {move: this.props.move, edit: false};
    this.editView = this.editView.bind(this);
    this.displayView = this.displayView.bind(this);
    this.editMove = this.editMove.bind(this);
    this.deleteMove = this.deleteMove.bind(this);
    this.setEdit = this.setEdit.bind(this);
  }

  editMove(e, id, formData) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/moves/' + id,
      type: 'PUT',
      data: {move: {name: this.refs.moveName.value, url: this.refs.moveUrl.value}}
    }).success(data => {
      this.setState({move: data, edit: false});
      this.props.fetchMoves();
    }).error(data => {
      console.log(data);
    });
  }

  deleteMove(e, id) {
    e.preventDefault();

    $.ajax({
      url: '/api/v1/moves/' + id,
      type: 'DELETE'
    }).success(data => {
      this.props.fetchMoves();
    }).error(data => {
      console.log(data);
    });
  }


  editView() {
    if(this.state.edit) {
      let move = this.props.move;

      return(<div className='col s12 m4'>
               <form onSubmit={(e) => this.editMove(e, move.id)}>
                 <div className='card blue-grey darken-1'>
                   <div className='card-content white-text'>
                       <p>
                         <input type='text' required='true' defaultValue={move.name} ref='moveName' />
                       </p>
                       <p>
                         <textarea className='materialize-textarea' required='true' defaultValue={move.url} ref='moveUrl'></textarea>
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

  setEdit(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit});
  }

  deleteAction(moveId) {
    const challengeMoveIds = [1,2,3,4];
    if(!challengeMoveIds.includes(moveId)) {
      return(<a href="#" className='btn red white-text' onClick={(e) => this.deleteMove(e, moveId)}>
               <i className='fa fa-trash' />
             </a>);
    }
  }

  displayView() {
    if(!this.state.edit) {
      let move = this.state.move;

      return(<div className='col s12 m4'>
             <div className="card blue-grey darken-1">
               <div className='card-content white-text'>
                 <span className='card-title'>{move.name}</span>
               </div>
               <div className='card-action'>
                 <a href="#" className='btn ozone-button' onClick={this.setEdit}>
                   <i className='fa fa-edit' />
                 </a>
                 {this.deleteAction(move.id)}
               </div>
            </div>
           </div>);
    }
  }

  render() {
    return(<div>
             {this.editView()}
             {this.displayView()}
           </div>);
  }
}