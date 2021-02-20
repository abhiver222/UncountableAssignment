import React, {Component} from 'react';
import { expData } from "../data/expData";
import ScatterPlot from "../charts/ScatterPlot"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutputRange from "./OutputRange"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class ScatterPlotContatiner extends Component{

  constructor(){
    super()
    this.state = {
      inputDic:   null,
      outputDic:  null,
      inputList:  null,
      outputList: null,
      inputSel:   "",
      outputSel:  "",
      ready:      false,
      outputMin:  0,
      outputMax:  0,
    }
  }

  componentDidMount(){
    // read data
    this.readData()
  }

  readData = () => {
    let inputDic   = {}
    let outputDic  = {}
    let inputList  = []
    let outputList = []

    for (var exp in expData){
      let inputs  = expData[exp]["inputs"]
      let outputs = expData[exp]["outputs"]

      for(var input in inputs){
        if(!(input in inputDic)){
          inputDic[input] = []
          inputList.push(input)
        }
        inputDic[input].push(inputs[input])
      }
      for(var output in outputs){
        if(!(output in outputDic)){
          outputDic[output] = []
          outputList.push(output)
        }
        outputDic[output].push(outputs[output])
      }
    }

    // min and max range of default ourput ingredient
    let outputMin = Math.min(...outputDic[outputList[0]])
    let outputMax = Math.max(...outputDic[outputList[0]])

    this.setState({inputDic: inputDic, outputDic: outputDic, inputList: inputList, outputList: outputList, inputSel: inputList[0], outputSel: outputList[0], outputMin: outputMin, outputMax: outputMax, ready: true})
  }

  render(){
    return (
      <div className="scatterPlotContatiner">
        <h2 className="inputOutHeading">Input Output ScatterPlots</h2>
        {this.state.ready ?
          <div className="scatterPlotDiv">
            <div className="scatterPlotChart">
              <ScatterPlot inputs={this.state.inputDic[this.state.inputSel]} outputs={this.state.outputDic[this.state.outputSel]} inputLabel={this.state.inputSel} outputLabel={this.state.outputSel} outputRange={[this.state.outputMin, this.state.outputMax]} />
            </div>
            <div className="scatterPlotInputs">
              <Card className="scatterPlotCard">
                <CardContent>
                  <FormControl variant="outlined" className="inputSel">
                    <InputLabel id="inputLabel">Input</InputLabel>
                    <Select
                      value={this.state.inputSel}
                      onChange={this.handleChange}
                      labelId="inputLabel"
                      name="inputSel"
                    >
                    {this.state.inputList.map(input => {
                      return <MenuItem key={input} value={input}>{input}</MenuItem>
                    })}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" className="outputSel">
                    <InputLabel id="outputLabel">Output</InputLabel>
                    <Select
                      value={this.state.outputSel}
                      onChange={this.handleChange}
                      labelId="outputLabel"
                      name="outputSel"
                    >
                    {this.state.outputList.map(output => {
                      return <MenuItem key={output} value={output}>{output}</MenuItem>
                    })}
                    </Select>
                  </FormControl>
                  <OutputRange submitRange={this.submitRange} outputMin={this.state.outputMin} outputMax={this.state.outputMax} outputIng={this.state.outputSel}/>
                </CardContent>
              </Card>
            </div>
          </div>
          :
          null
        }
      </div>
    )
  }

  submitRange = (min, max) => {
    this.setState({outputMin: min, outputMax: max})
  }

  handleChange = (event) => {
    let name  = event.target.name
    let value = event.target.value
    let state = { ...this.state }

    if(this.state.outputList.includes(value)){
      let output = this.state.outputDic[value]
      state["outputMin"] = Math.min(...output)
      state["outputMax"] = Math.max(...output)
    }
    
    state[name] = value
    this.setState(state)
  }

}

export default ScatterPlotContatiner
