import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class OutputRange extends Component{

  constructor(){
    super()
    this.state = {
      outputMin: "",
      outputMax: "",
      outputMinPlh: null,
      outputMaxPlh: null,
      outputError: "",
      inputError: "",
      outputIng: ""
    }
  }

  static getDerivedStateFromProps(props, state){
    return {outputMinPlh: props.outputMin, outputMaxPlh: props.outputMax, outputIng: props.outputIng}
  }

  render(){
    return (
      <div className="outputRangeContainer">
        <form onSubmit={this.onSubmitHandler}>
          <TextField type="number" name="outputMin" label="Min" value={this.state.outputMin} onChange={this.onChange} placeholder={`${this.state.outputMinPlh}`} InputLabelProps={{shrink: true}} className="outputMinTf"/>
          <TextField type="number" name="outputMax" label="Max" value={this.state.outputMax} onChange={this.onChange} placeholder={`${this.state.outputMaxPlh}`} InputLabelProps={{shrink: true}} helperText={this.state.outputError} error={this.state.outputError.length == 0 ? false : true}/>
          <br/>
          <Button variant="contained" color="primary" onClick={this.onSubmitHandler} className="rangeSubmitButton">
            Filter {this.state.outputIng}
          </Button>
        </form>
      </div>
    )
  }

  onChange = (event) => {
    let name  = event.target.name
    let value = event.target.value

    let state = { ...this.state }
    state[name] = value
    this.setState(state)
  }

  onSubmitHandler = () => {
    let outputMin = this.state.outputMin
    let outputMax = this.state.outputMax

    if(outputMax === ""){
      outputMax = this.state.outputMaxPlh
    }
    if(outputMin === ""){
      outputMin = this.state.outputMinPlh
    }
    let maxFl = parseFloat(outputMax)
    let minFl = parseFloat(outputMin)
    if(maxFl <= minFl){
      this.setState({outputError: "Max should be bigger than Min"})
      return
    }
    this.props.submitRange(minFl, maxFl)
  }

}

export default OutputRange
