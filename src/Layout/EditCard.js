import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm"; // Import the CardForm component

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    async function loadDeckAndCard() {
      try {
        const loadedDeck = await readDeck(deckId);
        const loadedCard = await readCard(cardId);
        setDeck(loadedDeck);
        setCard(loadedCard);
      } catch (error) {
        console.error("Error fetching deck or card:", error);
      }
    }
    loadDeckAndCard();
  }, [deckId, cardId]);

  const handleSubmit = async (formData) => {
    try {
      const updatedCard = {
        ...card,
        ...formData,
      };
      await updateCard(updatedCard);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">{/* ... (breadcrumb code) */}</nav>
      <div>
        <h2>Edit Card</h2>
        {card.id && ( // Check if card data is loaded
          <CardForm
            initialData={card}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={true} // Pass isEditing prop as true for EditCard
          />
        )}
      </div>
    </div>
  );
}

export default EditCard;
