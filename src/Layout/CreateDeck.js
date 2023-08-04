import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newDeck = await createDeck(formData);
      history.push(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  }

  // Function to handle form input changes
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" className="btn btn-secondary mr-2">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
