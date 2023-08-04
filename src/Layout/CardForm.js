import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CardForm({ initialData, onSubmit, onCancel }) {
  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialData });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
    } else {
      history.goBack();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
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
  );
}

export default CardForm;
