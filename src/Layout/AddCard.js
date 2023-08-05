import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

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

  const handleSubmit = async (front, back) => {
    try {
      await createCard(deckId, { front, back });
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      {deck.name && (
        <>
          <h2>{deck.name}</h2>
          <h3>Add Card</h3>
          <CardForm
            initialData={formData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={false} // Pass isEditing prop as false for AddCard
          />
        </>
      )}
    </div>
  );
}

export default AddCard;
