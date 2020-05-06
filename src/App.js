import React from 'react';
import createHistory from 'history/createBrowserHistory';
import RoutingHolder from './containers/routingHolders';

const history = createHistory();

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
          <RoutingHolder history={history} />
      </div>
    );
  }
}

export default App;
