import { useState } from "react";
import "./App.css";
import CardBack from "./components/CardBack";
import CardFront from "./components/CardFront";
import CardForm from "./components/CardForm";
import complete from "./assets/images/icon-complete.svg";
import Complete from "./components/Complete";

function App() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "0000 0000 0000 0000",
    cardHolder: "Jane Appleseed",
    expiryMonth: "00",
    expiryYear: "00",
    cvv: "000"
  });

  const [isComplete, setIsComplete] = useState(false); // Toggle between form and complete section

  const handleSubmit = () => {
    setIsComplete(true);
  };

  const handleReset = () => {
    setIsComplete(false);
  };


  return (
    <div className="lg:grid lg:grid-cols-4 min-h-screen">
      <section className="relative bg-[url(./assets/images/bg-main-mobile.png)] md:bg-[url(./assets/images/bg-main-desktop.png)] bg-cover bg-center h-60 w-full lg:h-full pt-16 px-4 flex items-start justify-center mx-auto">
        <div className="relative w-full max-w-md h-full">
          <CardBack cvv={cardDetails.cvv} />
          <CardFront
            cardNumber={cardDetails.cardNumber}
            cardHolder={cardDetails.cardHolder}
            expiryMonth={cardDetails.expiryMonth}
            expiryYear={cardDetails.expiryYear}
          />
        </div>
      </section>
      {isComplete ? (
        <Complete complete={complete} onReset={handleReset} />
      ) : (
        <CardForm setCardDetails={setCardDetails} onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default App;
