import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
const cardImages = [
  { src: "/img/helmet.jpg", matched: false },
  { src: "/img/flower.jpg", matched: false },
  { src: "/img/sun.jpg", matched: false },
  { src: "/img/scroll.png", matched: false },
  { src: "/img/shiled.png", matched: false },
  { src: "/img/sword.png", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [selectOne, setSelectOne] = useState(null);
  const [selectTwo, setSelectTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [userSignin, setUserSignin] = useState(false);
  const [userName, setUserName] = useState("");
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setSelectOne(null);
    setSelectTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  const handleSelect = (card) => {
    selectOne ? setSelectTwo(card) : setSelectOne(card);
  };

  useEffect(() => {
    if (selectOne && selectTwo) {
      setDisabled(true);

      if (selectOne.src === selectTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === selectOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [selectOne, selectTwo]);

  const resetTurn = () => {
    setSelectOne(null);
    setSelectTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const handlePushToGameBox = (e) => {
    e.preventDefault();
    setUserSignin(true);
    shuffleCards();
  };
  return (
    <div className="App">
      {userSignin ? (
        <div className="game-box">
          <h1>Welcome {userName} to Memory Game ! </h1>

          <button onClick={shuffleCards}>New Game</button>
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleSelect={handleSelect}
                flipped={
                  card === selectOne || card === selectTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
          <p>Turns : {turns}</p>
        </div>
      ) : (
        <div className="form-control">
          <h1>Welcome to Memory Game ! </h1>
          <p>Enjoy the game and please dont refresh page on this game!</p>
          <form onSubmit={handlePushToGameBox}>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Enter Your Name ... "
              value={userName}
            />
            <button> Start Game </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
