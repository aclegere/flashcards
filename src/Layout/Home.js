import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);

  // Fetch the list of decks on component mount
  useEffect(() => {
    async function fetchDecks() {
      try {
        const decks = await listDecks();
        setDecks(decks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    }
    fetchDecks();
  });

  // Function to handle deck deletion
  async function handleDeleteDeck(deckId) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        await deleteDeck(deckId);
        setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  }

  return (
    <div>
      <Link to="/decks/new" className="btn btn-primary">
        Create Deck
      </Link>
      <div>
        {decks.map((deck) => (
          <div key={deck.id}>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <p>{deck.cards.length} cards</p>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
              Study
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteDeck(deck.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
