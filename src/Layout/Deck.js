import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    loadDeck();
  }, [deckId]);

  async function handleDeleteCard(cardId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (confirmDelete) {
      try {
        await deleteCard(cardId);
        // After successful card deletion, update the deck state to reflect the changes
        setDeck((prevDeck) => ({
          ...prevDeck,
          cards: prevDeck.cards.filter((card) => card.id !== cardId),
        }));
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  }

  async function handleDeleteDeck() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (confirmDelete) {
      try {
        await deleteDeck(deckId);
        // Handle deletion, redirect to home
        window.location.reload();
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
          Study
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
        <button
          className="btn btn-danger float-right"
          onClick={handleDeleteDeck}>
          Delete
        </button>
      </div>
      <div className="mt-4">
        <h3>Cards</h3>
        {deck.cards &&
          deck.cards.map((card) => (
            <div key={card.id} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{card.front}</h5>
                <p className="card-text">{card.back}</p>
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary mr-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCard(card.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Deck;
