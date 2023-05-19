import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ItemDetails from "./components/ItemDetails";
import CreateNewListing from "./components/ListingForm";
import ListingForm from "./components/ListingForm";
import ManageListings from "./components/ManageListings";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path={'/managelistings'}>
            <ManageListings />
          </Route>

          <Route path={"/items/:itemId/edit"}>
            <ListingForm isUpdating={true} />
          </Route>

          <Route path={"/items/new"}>
            <ListingForm isUpdating={false} />
          </Route>

          <Route path={"/items/:itemId"}>
            <ItemDetails />
          </Route>
        </Switch>}
        <Footer />
    </>
  );
}

export default App;
