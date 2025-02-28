import cardLogo from "../assets/images/card-logo.svg";

interface CardFrontProps {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
}

const formatCardNumber = (cardNumber: string) => {
  return cardNumber.replace(/\s+/g, "").match(/.{1,4}/g)?.join(" ") || "";
};

// x= /-mt-23 -ml-17
const CardFront = ({
  cardNumber,
  cardHolder,
  expiryMonth,
  expiryYear,
}: CardFrontProps) => {
  return (
    <div className="absolute bg-[url(./assets/images/bg-card-front.png)] bg-contain bg-no-repeat w-[75%] sm:w-[90%] max-w-[22rem] aspect-[16/9] z-10 flex flex-col justify-between px-4 pt-4 pb-7 top-4 -left-3 translate-x-[10%] translate-y-[40%] sm:translate-x-[-10%] sm:translate-y-[40%] card-front">
      <img src={cardLogo} alt="Card Logo" className="w-12 md:w-16" />
      <div className="space-y-2">
        <p className="text-start text-sm md:text-lg tracking-widest"> {formatCardNumber(cardNumber)}</p>
        <div className="w-full flex justify-between text-xs md:text-sm">
          <p className="uppercase">{cardHolder}</p>
          <p>
            {expiryMonth}/{expiryYear}
            {/* {String(expiryMonth).padStart(2, "0")}/{String(expiryYear).slice(-2)} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFront;
