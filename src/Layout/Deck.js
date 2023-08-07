import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { url } = useRouteMatch();

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
    try {
      if (confirmDelete) {
        await deleteCard(cardId);
        history.push(`/`);
      } else {
        history.push(`${url}`);
      }
    } catch (error) {
      console.log(error);
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
