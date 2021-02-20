import React, {Component} from 'react';
import { Scatter } from "react-chartjs-2";
import { globals } from "../Globals"

class ScatterPlot extends Component{

  constructor(){
    super()
    this.state = {
      chartData: null,
      inputs: null,
      outputs: null,
      inputLabel: null,
      outputLabel: null,
      options: null,
      outputRange: null
    }
  }

  static getDerivedStateFromProps(props, state){
    return {inputs: props.inputs, outputs: props.outputs, inputLabel: props.inputLabel, outputLabel: props.outputLabel, outputRange: props.outputRange}
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.inputLabel != nextState.inputLabel || this.state.outputLabel != nextState.outputLabel || this.getSum(this.state.outputRange) != this.getSum(nextState.outputRange)){
      this.readData(nextState)
    }
    return true
  }

  componentDidMount(){
    this.readData()
  }

  getSum = (range) => {
    return range.reduce((a,b) => a+b, 0)
  }

  readData = (nextState) => {
    let state = this.state
    if(nextState){
      state = nextState
    }

    let data = []
    let inputs  = state.inputs
    let outputs = state.outputs
    let outputRange = state.outputRange

    for(var i = 0; i < inputs.length; i++){
      if(outputRange[0] <= outputs[i] && outputs[i] <= outputRange[1]){
        data.push({x: inputs[i], y: outputs[i]})
      }
    }

    let cdata = {
      labels: ['Scatter'],
      datasets: [
        {
          label: state.inputLabel + " x " + state.outputLabel,
          labelColor: "white",
          fill: false,
          backgroundColor: '#fff',
          pointBorderColor: globals.colorMap[state.outputLabel],
          pointBackgroundColor: globals.colorMap[state.inputLabel],
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 10,
          data: data
        }
      ]
    };

    let options = {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: state.inputLabel,
            fontColor: "white",
            padding:20,
            fontSize: 15
          },
          gridLines:{
            color: "#262626",
            lineWidth:2
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: state.outputLabel,
            fontColor: "white",
            padding: 20,
            fontSize:15
          },
          gridLines:{
            color: "#262626"
          }
        }]
      }
    }

    this.setState({chartData: cdata, options: options})

  }

  render(){
    return (
      <div className="scatterDiv">
        {this.state.chartData ?
          <Scatter data={this.state.chartData} options={this.state.options} redraw />
          :
          <p>Loading chart</p>
        }
      </div>
    )
  }

}

export default ScatterPlot
