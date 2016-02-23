class Moves extends React.Component {
  constructor(props){
    super(props);
    this.state = {newMoves: this.props.newMoves, moves: [], loaded: false};
    this.displayMoves = this.displayMoves.bind(this);
    this.addMove = this.addMove.bind(this);
    this.fetchMoves = this.fetchMoves.bind(this);
    this.searchMoves = this.searchMoves.bind(this);
  }

  fetchMoves() {
    $.ajax({
      url: '/api/v1/moves',
      type: 'GET',
    }).success(data => {
      this.setState({moves: data.moves, loaded: true});
    }).error(data => {
      console.log(data);
    });
  }

  componentWillMount() {
    this.fetchMoves();
  }

  displayMoves() {
    if(this.state.moves.length) {
      let moves = this.state.moves.map(move => {
        let key = `move-${move.id}`;
        return(<Move key={key} move={move} fetchMoves={this.fetchMoves} />);
      });
      return moves;
    } else {
      return(<h5 className='center'>No Moves Created.</h5>);
    }
  }

  addMove(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/v1/moves',
      type: 'POST',
      data: {move: {name: this.refs.moveName.value, url: this.refs.moveUrl.value}}
    }).success(data => {
      let moves = this.state.moves;
      moves.push(data);
      this.refs.moveName.value = '';
      this.refs.moveUrl.value = '';
      this.setState({moves: moves});
    }).error(data => {
      alert(data.responseJSON.errors);
    });
  }

  searchMoves() {
    $.ajax({
      url: '/api/v1/moves',
      type: 'GET',
      data: {move_query: this.refs.moveQuery.value}
    }).success(data => {
      this.setState({moves: data.moves});
    }).error(data => {
      console.log(data);
    });
  }

  render() {
    if(this.state.loaded) {
      return(<div>
               <h5 className='center'>Add Move</h5>
               <form onSubmit={this.addMove}>
                 <input type='text' required='true' placeholder='Move Name' ref='moveName' />
                 <input type='text' required='true' placeholder='Move URL' ref='moveUrl' />
                 <button type='submit' className='btn ozone-button'>Add</button>
               </form>
               <br />
               <h5 className='center'>Moves Search</h5>
               <input type='text' ref='moveQuery' placeholder='Search Moves' onChange={this.searchMoves} />
               {this.displayMoves()}
             </div>);
    } else {
      return(<h5 className='center'>Loading...</h5>);
    }
  }
}