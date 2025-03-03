// type complete: string;

interface CompleteProps {
  complete: string;
  onReset: () => void;
}

export default function Complete({ complete, onReset }: CompleteProps) {
    return (
        <section className="text-very-dark-violet flex flex-col gap-4 items-center justify-center m-auto p-8 mt-20 sm:mt-28 md:my-36 lg:my-auto md:mx-auto w-full max-w-md col-span-3">
        <img src={complete} alt="icon complete"></img>
        <h1 className="text-3xl">Thank you!</h1>
        <p className="text-dark-grayish-violet font-medium">We've added your card details</p>
        <button type="button" onClick={onReset} className="bg-very-dark-violet hover:bg-very-dark-violet/85 text-white p-2 w-full rounded-lg mt-4">Continue</button>
      </section>
    )
}