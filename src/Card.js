/** Card: Renders card
 *
 * Props:
 * - card: Card object from API
 *
 * Deck -> Card
 */

function Card({ card }) {
  return (
    <li><img
      className="Card"
      src={card.image}
      alt={`${card.value} of ${card.suit}`}
    /></li>
  );
}

export default Card;