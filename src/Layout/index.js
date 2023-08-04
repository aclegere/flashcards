import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index";
import EditCard from "./EditCard";
import Study from "./Study";
import Deck from "./Deck";
import AddCard from "./AddCard";
import CreateDeck from "./CreateDeck";
import Home from "./Home";
import EditDeck from "./EditDeck";

function Layout() {
  const [decks, setDecks] = useState([]);

  //load decks
  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const loadedDecks = await listDecks();
        setDecks(loadedDecks);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} />
          </Route>
          <Route path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <Deck />
          </Route>
          <Route path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>
          <Route path={"/decks/:deckId/cards/new"}>
            <AddCard />
          </Route>
          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
