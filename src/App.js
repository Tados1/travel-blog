import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import ErrorPage from './components/ErrorPage';
import Articles from './components/Articles';
import Create from './components/Create';
import BlogDetails from './components/BlogDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyContext from './components/MyContext';

const App = () => {
  const [pageCountry, setPageCountry] = useState('Initial Text');

  return (
    <Router>
      
      <MyContext.Provider value={{ pageCountry, setPageCountry }}>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/articles">
          <Articles />
        </Route>
        <Route path="/article/:id">
          <BlogDetails />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
      </MyContext.Provider>
    </Router>
  );
};

export default App;