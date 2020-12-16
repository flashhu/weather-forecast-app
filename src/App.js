import { Suspense, lazy } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import Login from './page/login';
import Layout from './component/Layout';

const History = lazy(() => import('./page/history'));
const Weather = lazy(() => import('./page/weather'));
const Map = lazy(() => import('./page/map'));
const Setting = lazy(() => import('./page/setting'));
const NotFound = lazy(() => import('./page/notFound'));

const SuspenseWrapper = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' render={() => (
          <Layout>
            <SuspenseWrapper>
              <Switch>
                <Route path='/' exact component={Weather} />
                <Route path='/map' exact component={Map} />
                <Route path='/history' exact component={History} />
                <Route path='/setting' exact component={Setting} />
                <Route component={NotFound} />
              </Switch>
            </SuspenseWrapper>
          </Layout>
        )} />
      </Switch>
    </Router>
  );
}

export default App;