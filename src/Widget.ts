import React, { useState } from 'react';

interface CardFormData {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
}

const MyWidget: React.FC = () => {
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateCardData = () => {
    // Basic validation, you should implement more robust validation logic.
    if (!formData.cardNumber || !formData.cardHolder || !formData.expirationDate || !formData.cvv) {
      setError('Please fill in all fields.');
      return false;
    }
    setError(null);
    return true;
  };

  const tokenizeCardData = async () => {
    if (validateCardData()) {
      setLoading(true);

      // Simulate tokenization with a fictional API (replace with actual implementation)
      try {
        const response = await fetch('https://api.example.com/tokenize', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Tokenization successful:', result);
          // Handle successful tokenization here
        } else {
          setError('Tokenization failed.');
        }
      } catch (error) {
        setError('An error occurred while tokenizing.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <form>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Card Holder:</label>
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={tokenizeCardData} disabled={loading}>
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default MyWidget;
