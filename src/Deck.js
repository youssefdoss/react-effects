import { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const BASE_URL = 'https://deckofcardsapi.com/api/deck/';

/** Deck: Renders the deck component and holds deck state
 *
 * State:
 * - deck: Object with deck data and Boolean for isLoading
 * - drawnCards: Object with cards array and Boolean for isLoading
 *
 * App -> Deck -> Card
 */

function Deck() {
  const [deck, setDeck] = useState({
    data: null,
    isLoading: true
  });
  const [drawnCards, setDrawnCards] = useState({
    data: [],
    isLoading: false
  });

  useEffect(function getDeck() {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}/new/shuffle`);
      setDeck(response.data);
    }
    fetchData();
  }, []);

  async function drawCard() {
    setDrawnCards({
      data: [],
      isLoading: true
    });

    const response = await axios.get(`${BASE_URL}${deck.deck_id}/draw/?count=1`);

    if (response.data.remaining === 0) return <h1>Error: no cards remaining!</h1>

    const card = response.data.cards[0];

    setDrawnCards(prevCards => {return {
      data: [...prevCards.data, card],
      isLoading: false,
    }});
  }

  // TODO: Global isLoading?
  if (deck.isLoading || drawnCards.isLoading) return <h1>Loading...</h1>

  return (
    <div className="Deck">
      {console.log(drawnCards)}
      <button onClick={drawCard}>Draw Card</button>
      <ul>
        {drawnCards.length > 0 && drawnCards.map(card => (
          <Card
            key={card.code}
            card={card}
          />
        ))}
      </ul>
    </div>
  )
}

export default Deck;