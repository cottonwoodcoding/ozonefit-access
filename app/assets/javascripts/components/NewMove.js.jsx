class NewMove extends React.Component {
  constructor(props){
    super(props);
    this.state = {moves: []};
    this.sendMove = this.sendMove.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: '/api/v1/moves',
      type: 'GET'
    }).success(data => {
      this.setState(data);
    }).error(data => {
      console.log(data);
    });
  }

  sendMove() {
    this.props.addMove({moveId: this.refs.moveId.value, reps: this.refs.reps.value});
  }

  render() {
    let moveOptions = this.state.moves.map(move =>
      <option value={move.id} >{move.name}</option>
    );
    return(<div className='input-field col s12'>
             <select className='browser-default col s12 m6' required='true' ref='moveId'>
               {moveOptions}
             </select>
             <input className='col s12 m6' type='text' placeholder='Reps' ref='reps' required='true' onChange={this.sendMove} />
           </div>);
  }
}