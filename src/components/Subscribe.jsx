import React, { useState } from "react";
import "./Subscribe.css";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!email || !fullName) {
      alert("Please fill in all fields");
      return;
    }

    // Create a payload object with form data
    const payload = {
      email,
      full_name: 'none',
    };

    try {
      // Make a POST request to the endpoint
      const response = await fetch(
        "/api/subscribe/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      // Handle successful subscription
      console.log("Subscription successful:", data);

      // Reset form fields
      setEmail("");
      setFullName("");
    } catch (error) {
      // Handle subscription error
      console.error("Subscription error:", error);
      alert("An error occurred while subscribing");
    }
  };

  return (
    <div className="subscribe-container">
      <form onSubmit={handleSubmit}>
        <label className="subscribe-label" htmlFor="email">
          Subscribe
        </label>
        <input
          className="subscribe-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <label className="fullName-label" htmlFor="Full Name">
            Full Name
          </label>
          <input
            className="fullName-input"
            type="text"
            id="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <button className="subscribe-button" type="submit">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
