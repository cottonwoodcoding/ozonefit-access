class Nutritions extends React.Component {
  constructor(props){
    super(props);
    this.state = {nutritions: [], loaded: false};
    this.displayNutritions = this.displayNutritions.bind(this);
    this.nutritionForm = this.nutritionForm.bind(this);
    this.addNutrition = this.addNutrition.bind(this);
    this.refreshNutritions = this.refreshNutritions.bind(this);
  }

  componentWillMount() {
    this.refreshNutritions();
  }

  refreshNutritions() {
    $.ajax({
      type: 'GET',
      url: '/api/v1/nutritions'
    }).success(data => {
      this.setState({nutritions: data.nutritions, loaded: true});
    }).error(data => {
      console.log(data);
    });
  }

  displayNutritions() {
    if(this.state.nutritions.length) {
      let nutritions = this.state.nutritions.map(nutrition => {
        let key = `nutrition-${nutrition.id}`;
        return(<Nutrition key={key} nutrition={nutrition} refreshNutritions={this.refreshNutritions} />);
      });
      return nutritions;
    } else {
      return(<h5 className='center'>No Nutritions, Please Create One</h5>);
    }
  }

  addNutrition(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/v1/nutritions',
      data: {nutrition: {embedUrl: this.refs.embedUrl.value.trim()}}
    }).success(data => {
      let nutritions = this.state.nutritions;
      nutritions.push(data);
      this.refs.embedUrl.value = null;
      this.setState({nutritions: nutritions});
    }).error(data => {
      console.log(data);
    });
  }

  nutritionForm() {
    return(<div>
             <form id="nutrition_form" onSubmit={this.addNutrition}>
               <input type='text' placeholder="Embed Url" ref="embedUrl" required />
               <button type='submit' className='btn ozone-button'>Add</button>
             </form>
             <br />
           </div>);
  }

  render() {
    if(this.state.loaded) {
      return(
        <div>
          <h5 className='center'>Nutritions</h5>
          {this.nutritionForm()}
          <div className='row'>
            {this.displayNutritions()}
          </div>
        </div>
      );
    } else {
      return(<h5 className='center'>Loading...</h5>);
    }
  }
}