import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ItemDetails from "./components/ItemDetails";
import CreateNewListing from "./components/CreateNewListing";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // console.log("USER ---------> : ", user)
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path={"/items/new"}>
            <CreateNewListing />
          </Route>
          <Route path={"/items/:itemId"}>
            <ItemDetails />
          </Route>
        </Switch>}
    </>
  );
}

export default App;
