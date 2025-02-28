interface CardBackProps {
  cvv: string;
}

const CardBack = ({ cvv }: CardBackProps) => {
  return (
    <div className="absolute bg-[url(./assets/images/bg-card-back.png)] bg-contain bg-no-repeat w-[80%] max-w-[22rem] aspect-[16/9] flex flex-col justify-center items-end p-8 top-4 right-4 -translate-y-[15%] card-back">
      <p className="text-white text-sm md:text-base mr-2 mb-2">{cvv}</p>
    </div>
  );
};

export default CardBack;
