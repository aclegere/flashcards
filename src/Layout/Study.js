import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Fetch the deck and cards
  useEffect(() => {
    async function fetchDeck() {
      try {
        const deck = await readDeck(deckId);
        setDeck(deck);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    fetchDeck();
  }, [deckId]);

  // Function to handle card flipping
  function handleFlipCard() {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  }

  // Function to move to the next card
  function handleNextCard() {
    if (currentCardIndex + 1 < deck.cards.length) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    } else {
      // Show a message or prompt to restart the deck
      if (
        window.confirm(
          "You have finished studying the deck. Do you want to restart?"
        )
      ) {
        setCurrentCardIndex(0);
        setIsFlipped(false);
      } else {
        // Redirect to the deck view if the user doesn't want to restart
        window.location.href = `/decks/${deckId}`;
      }
    }
  }

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck?.name}</Link>
          </li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      <h2>Study: {deck?.name}</h2>
      {deck?.cards.length > 2 ? (
        <div>
          <h3>
            Card {currentCardIndex + 1} of {deck?.cards.length}
          </h3>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {isFlipped ? "Back Side" : "Front Side"}
              </h5>
              <p className="card-text">
                {isFlipped
                  ? deck.cards[currentCardIndex].back
                  : deck.cards[currentCardIndex].front}
              </p>
              <button className="btn btn-secondary" onClick={handleFlipCard}>
                Flip
              </button>
              {isFlipped && (
                <button className="btn btn-primary" onClick={handleNextCard}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3>Not enough cards.</h3>
          <p>You need at least 3 cards to study. Add more cards to the deck.</p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      )}
    </div>
  );
}

export default Study;
