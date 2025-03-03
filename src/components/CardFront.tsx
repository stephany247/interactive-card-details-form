import cardLogo from "../assets/images/card-logo.svg";

interface CardFrontProps {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
}

// const formatCardNumber = (cardNumber: string) => {
//   return cardNumber.replace(/\s+/g, "").match(/.{1,4}/g)?.join(" ") || "";
// };

const formatMonth = (month: string) => {
  let num = parseInt(month, 10);
  
  if (isNaN(num) || num <= 0) return "00"; // Handle invalid or empty input
  if (num > 12) return "00"; // Prevent invalid months
  return num < 10 ? `0${num}` : `${num}`; // Add leading zero if less than 10
};

const formatYear = (year: string) => {
  let num = parseInt(year, 10);

  if (isNaN(num) || num < 0) return "00"; // Handle invalid or empty input
  if (num < 10) return `0${num}`;
  return year.slice(0, 2); // Limit to 2 digits
};


// x= /-mt-23 -ml-17
const CardFront = ({
  cardNumber,
  cardHolder,
  expiryMonth,
  expiryYear,
}: CardFrontProps) => {
  return (
    <div className="absolute bg-[url(./assets/images/bg-card-front.png)] bg-contain bg-no-repeat w-[75%] sm:w-[90%] lg:w-80 max-w-[22rem] aspect-[16/9] z-10 flex flex-col justify-between px-4 pt-4 pb-7 top-4 lg:top-0 -left-3 lg:left-1/2 translate-x-[10%] translate-y-[40%] sm:translate-x-[-10%] sm:translate-y-[40%] card-front drop-shadow-2xl">
      <img src={cardLogo} alt="Card Logo" className="w-12 md:w-16" />
      <div className="space-y-2">
        <p className="text-start text-sm md:text-lg tracking-widest lg:tracking-[.2rem]"> {cardNumber}</p>
        <div className="w-full flex justify-between text-xs md:text-sm">
          <p className="uppercase">{cardHolder}</p>
          <p>
            {formatMonth(expiryMonth)}/{formatYear(expiryYear)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFront;
