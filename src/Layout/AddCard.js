import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createCard(deckId, formData);
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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="front" className="form-label">
                Front
              </label>
              <textarea
                id="front"
                name="front"
                className="form-control"
                rows="3"
                value={formData.front}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="back" className="form-label">
                Back
              </label>
              <textarea
                id="back"
                name="back"
                className="form-control"
                rows="3"
                value={formData.back}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default AddCard;
