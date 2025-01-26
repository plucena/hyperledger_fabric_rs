import React from 'react';
import { Location, Locations, NotFound } from 'react-router-component';
import Loadable from 'react-loadable';

function Loading(props) {
  if (props.error) {
    return <p>Error! {props.error}</p>;
  } else {
    return <p>Loading...</p>;
  }
}

export default class Router extends React.Component {

  render() {
    return (
      <Locations>
        <Location path="/" handler={Loadable({
          loader: () => import('./components/Main.jsx'),
          loading: Loading
        })} />
        {/* <Location path="/transactions" handler={Loadable({
          loader: () => import('./components/TransactionsInfo.jsx'),
          loading: Loading
        })} /> */}
        <Location path="/:projectId" handler={Loadable({
          loader: () => import('./components/Main.jsx'),
          loading: Loading
        })} />
        <NotFound handler={() => <div className="container"><h2 className="text-center mt-3">Error 404! Not found</h2></div>} />
      </Locations>
    );
  }
}
