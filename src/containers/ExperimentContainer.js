import React, {Component} from 'react';
import { expData } from "../data/expData"
import DoughnutChart from "../charts/DoughnutChart"
import { globals } from "../Globals"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

class ExperimentContainer extends Component{

  constructor(){
    super()
    this.state = {
      inputsDic: {},
      outputsDic: {},
      expList: [],
      expSel: null,
      ready: false
    }
  }

  componentDidMount(){
    this.readData()
  }

  readData = () => {
    let inputsDic = {}
    let outputsDic = {}
    let expList = []

    // make a grouping dictionary of multi variant ingredients

    for(var exp in expData){
      expList.push(exp)
      let inputs = expData[exp]["inputs"]
      inputsDic[exp] = {}
      inputsDic[exp]["polymers"] = globals.ingredientMap.polymers.map(ingredient => inputs[ingredient])
      inputsDic[exp]["carbon"] = globals.ingredientMap.carbon.map(ingredient => inputs[ingredient])
      inputsDic[exp]["silica"] = globals.ingredientMap.silica.map(ingredient => inputs[ingredient])
      inputsDic[exp]["plasticizer"] = globals.ingredientMap.plasticizer.map(ingredient => inputs[ingredient])
      inputsDic[exp]["coAgent"] = globals.ingredientMap.coAgent.map(ingredient => inputs[ingredient])
      inputsDic[exp]["curingAgent"] = globals.ingredientMap.curingAgent.map(ingredient => inputs[ingredient])
      inputsDic[exp]["antioxidant"] = inputs["Antioxidant"]
      inputsDic[exp]["coloring"] = inputs["Coloring Pigment"]
      inputsDic[exp]["temprature"] = inputs["Oven Temperature"]

      let outputs = expData[exp]["outputs"]
      outputsDic[exp] = outputs
    }

    this.setState({expList: expList.sort(), inputsDic: inputsDic, ready: true, expSel: expList[0], outputsDic: outputsDic})

  }

  getIngredientColors = (ingredients) => {
    return ingredients.map(ingredient => globals.colorMap[ingredient])
  }

  handleChange = (event) => {
    let name  = event.target.name
    let value = event.target.value
    let state = { ...this.state }
    state[name] = value
    this.setState(state)
  }

  render(){
    // display dougnut graphs for multi variant ingredients and color them appropriately
    return(
      <div className="experimentContainer">
        <h2>Experiment Composition</h2>
        {this.state.ready ?
        <div className="doughnutContainer">
          <div className="doughnutGraphs">
            <div className="row">
              <div className="polymers col doughnutChart">
                <h5>Polymers</h5>
                <DoughnutChart expName={this.state.expSel} data={this.state.inputsDic[this.state.expSel]["polymers"]} labels={globals.ingredientMap.polymers} colors={this.getIngredientColors(globals.ingredientMap.polymers)}/>
              </div>
              <div className="carbon col doughnutChart">
                <h5>Carbon</h5>
                <DoughnutChart expName={this.state.expSel} data={this.state.inputsDic[this.state.expSel]["carbon"]} labels={globals.ingredientMap.carbon} colors={this.getIngredientColors(globals.ingredientMap.carbon)}/>
              </div>
              <div className="silica col doughnutChart">
                <h5>Silica</h5>
                <DoughnutChart expName={this.state.expSel} data={this.state.inputsDic[this.state.expSel]["silica"]} labels={globals.ingredientMap.silica} colors={this.getIngredientColors(globals.ingredientMap.silica)}/>
              </div>
            </div>
            <div className="row">
              <div className="plasticizer col doughnutChart">
                <h5>Plasticizer</h5>
                <DoughnutChart expName={this.state.expSel} data={this.state.inputsDic[this.state.expSel]["plasticizer"]} labels={globals.ingredientMap.plasticizer} colors={this.getIngredientColors(globals.ingredientMap.plasticizer)}/>
              </div>
              <div className="coAgent col doughnutChart">
                <h5>Co-Agent</h5>
                <DoughnutChart expName={this.state.expSel} data={this.state.inputsDic[this.state.expSel]["coAgent"]} labels={globals.ingredientMap.coAgent} colors={this.getIngredientColors(globals.ingredientMap.coAgent)}/>
              </div>
              <div className="curingAgent col doughnutChart">
                <h5>Curing Agent</h5>
                <DoughnutChart expName={this.state.expSel} data={this.state.inputsDic[this.state.expSel]["curingAgent"]} labels={globals.ingredientMap.curingAgent} colors={this.getIngredientColors(globals.ingredientMap.curingAgent)}/>
              </div>
            </div>
          </div>
          <div className="experimentSection">
              <div>
                <FormControl variant="outlined">
                  <InputLabel id="expLabel">Experiment</InputLabel>
                  <Select
                    value={this.state.expSel}
                    onChange={this.handleChange}
                    labelId="expLabel"
                    name="expSel"
                  >
                  {this.state.expList.map(exp => {
                    return <MenuItem key={exp} value={exp}>{exp}</MenuItem>
                  })}
                  </Select>
                </FormControl>
              </div>
              <Card className="experimentCard">
                <CardContent>
                  <Typography  color="textSecondary" variant="h6" gutterBottom>
                    Other Inputs
                  </Typography>
                    <Table className="inputTable">
                      <TableBody>
                        <TableRow>
                          <TableCell>Antioxidant</TableCell>
                          <TableCell className="inputTableCell">{this.state.inputsDic[this.state.expSel]["antioxidant"]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Coloring Pigment</TableCell>
                          <TableCell>{this.state.inputsDic[this.state.expSel]["coloring"]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Oven Temprature</TableCell>
                          <TableCell>{this.state.inputsDic[this.state.expSel]["temprature"]}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  <Typography  color="textSecondary" variant="h6" gutterBottom >
                    Outputs
                  </Typography>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Viscosity</TableCell>
                          <TableCell className="inputTableCell">{this.state.outputsDic[this.state.expSel]["Viscosity"]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cure Time</TableCell>
                          <TableCell>{this.state.outputsDic[this.state.expSel]["Cure Time"]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Elongation</TableCell>
                          <TableCell>{this.state.outputsDic[this.state.expSel]["Elongation"]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Elongation</TableCell>
                          <TableCell>{this.state.outputsDic[this.state.expSel]["Elongation"]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Tensile Strength</TableCell>
                          <TableCell>{this.state.outputsDic[this.state.expSel]["Tensile Strength"]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Compression Set</TableCell>
                          <TableCell>{this.state.outputsDic[this.state.expSel]["Compression Set"]}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                </CardContent>
              </Card>
            </div>

        </div>
        : null }
      </div>
    )
  }
}

export default ExperimentContainer
