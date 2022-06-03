import "./SingleCard.css";
const SingleCard = ({ card, handleSelect, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleSelect(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.jpg"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
