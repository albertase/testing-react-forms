import React, { useState } from 'react';
import './TestApi.css';

const TestApi = () => {
  const [full_name, setFull_name] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!full_name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }

    // Create a payload object with form data
    const payload = {
     full_name,
      email,
      message,
    };



    try {
      // Make a POST request to the endpoint
      const response = await fetch('/subscriber/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Handle successful form submission
      console.log('Form submitted successfully:', data);
      alert('Form submitted successfully');

      // Reset form fields
      setFull_name('');
      setEmail('');
      setMessage('');
    } catch (error) {
      // Handle form submission error
      console.error('Form submission error:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div>
      <form className="test-api-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default TestApi;
