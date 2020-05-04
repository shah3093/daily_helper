import React, { Suspense } from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// import Home from './containers/Home/Home';

import Loader from './components/Loader/Loader';

const Home = React.lazy(() => {
  return import('./containers/Home/Home');
});

const DownloadImg = React.lazy(() => {
  return import('./containers/DownloadImg/DownloadImg');
});

const App = () => {


  let routes = (
    <Switch>

      <Route path="/" exact component={Home} />
      <Route path="/download-img" component={DownloadImg} />
      <Redirect to="/" />

    </Switch>
  );

  return (
    <Suspense fallback={<Loader />}>
      <React.Fragment>
        {routes}
      </React.Fragment>
    </Suspense>
  );
}

export default App;
