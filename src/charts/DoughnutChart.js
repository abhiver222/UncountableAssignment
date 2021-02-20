import React, {Component} from 'react'
import {Doughnut} from 'react-chartjs-2';

class DoughnutChart extends Component{

  constructor(){
    super()
    this.state = {
      cdata: null,
      labels: null,
      data: null,
      colors: null,
      expName: null
    }
  }

  static getDerivedStateFromProps(props, state){
    return {data: props.data, labels: props.labels, colors: props.colors, expName: props.expName}
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.expName != nextState.expName ){
      this.readData(nextState)
    }
    return true
  }

  componentDidMount(){
    this.readData()
  }

  readData = (nextState) => {

    let state = this.state
    if(nextState){
      state = nextState
    }

    let data = {
      labels: state.labels,
      datasets: [
        {
          label: '# of Votes',
          data: state.data,
          backgroundColor: state.colors,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    this.setState({cdata: data})
  }

  render(){
    return(
      <div>
        <Doughnut data={this.state.cdata} />
      </div>
    )
  }

}

export default DoughnutChart
