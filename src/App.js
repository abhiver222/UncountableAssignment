import logo from './logo.svg';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ScatterPlotContainer from "./containers/ScatterPlotContainer"
import ExperimentContainer from "./containers/ExperimentContainer"

function App() {

  // mui dark theme
  const theme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    });

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ExperimentContainer />
        <hr />
        <ScatterPlotContainer />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
