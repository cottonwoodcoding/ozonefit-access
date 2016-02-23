class AdminMotivations extends React.Component {
  constructor(props){
    super(props);
    this.state = {motivations: [], loaded: false};
    this.displayMotivations = this.displayMotivations.bind(this);
    this.motivationForm = this.motivationForm.bind(this);
    this.addMotivation = this.addMotivation.bind(this);
    this.refreshMotivations = this.refreshMotivations.bind(this);
  }

  componentWillMount() {
    this.refreshMotivations();
  }

  refreshMotivations() {
    $.ajax({
      type: 'GET',
      url: '/api/v1/motivations'
    }).success(data => {
      this.setState({motivations: data.motivations, loaded: true});
    }).error(data => {
      console.log(data);
    });
  }

  displayMotivations() {
    if(this.state.motivations.length) {
      let motivations = this.state.motivations.map(motivation => {
        let key = `motivation-${motivation.id}`;
        return(<Motivation key={key} motivation={motivation} refreshMotivations={this.refreshMotivations} />);
      });
      return motivations;
    } else {
      return(<h5 className='center'>No Motivations, Please Create One</h5>);
    }
  }

  addMotivation(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/v1/motivations',
      data: {motivation: {text: this.refs.motivationText.value}}
    }).success(data => {
      let motivations = this.state.motivations;
      motivations.push(data);
      this.refs.motivationText.value = null;
      this.setState({motivations: motivations});
    }).error(data => {
      console.log(data);
    });
  }

  motivationForm() {
    return(<div>
             <form id="motivation_form" onSubmit={this.addMotivation}>
               <input type='text' placeholder="Motivation Text" ref="motivationText" required />
               <button type='submit' className='btn ozone-button'>Add</button>
             </form>
             <br />
           </div>);
  }

  render() {
    if(this.state.loaded) {
      return(
        <div>
          <h5 className='center'>Motivations</h5>
          {this.motivationForm()}
          {this.displayMotivations()}
        </div>
      );
    } else {
      return(<h5 className='center'>Loading...</h5>);
    }
  }
}