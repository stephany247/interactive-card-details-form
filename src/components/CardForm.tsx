import { useState } from "react";

interface CardFormProps {
  setCardDetails: (details: any) => void;
  onSubmit: () => void;
}

const CardForm = ({ setCardDetails, onSubmit }: CardFormProps) => {
  const [errors, setErrors] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleCardholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, cardHolder: value }));
    setCardDetails((prev: any) => ({ ...prev, cardHolder: value }));

    setErrors((prev) => ({
      ...prev,
      cardHolder: value.trim() ? "" : "Cardholder name is required",
    }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = String(e.target.value).replace(/\D/g, ""); // Remove non-numeric characters
    value = value.slice(0, 16); // Limit to 16 digits

    const formattedString: string = value
      .replace(/(\d{4})/g, "$1 ")
      .trim(); // Add spaces

    setFormData((prev) => ({ ...prev, cardNumber: formattedString }));
    setCardDetails((prev: any) => ({ ...prev, cardNumber: formattedString }));

    setErrors((prev) => ({
      ...prev,
      cardNumber: value.length === 16 ? "" : "Card number must be 16 digits",
    }));
  };

  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    value = value.slice(0, 2); // Limit to 2 digits

    setFormData((prev) => ({ ...prev, expiryMonth: value }));
    setCardDetails((prev: any) => ({ ...prev, expiryMonth: value }));

    setErrors((prev) => ({
      ...prev,
      expiryMonth: value ? "" : "Can't be blank",
    }));
  };

  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (parseInt(value, 10) > 99) value = "00"; // Prevent invalid years

    setFormData((prev) => ({ ...prev, expiryYear: value }));
    setCardDetails((prev: any) => ({ ...prev, expiryYear: value }));

    setErrors((prev) => ({
      ...prev,
      expiryYear: value ? "" : "Can't be blank",
    }));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    value = value.slice(0, 3); // Limit to 3 digits

    setFormData((prev) => ({ ...prev, cvv: value }));
    setCardDetails((prev: any) => ({ ...prev, cvv: value }));

    setErrors((prev) => ({
      ...prev,
      cvv: value.length >= 3 ? "" : "CVV must be 3 digits",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      cardHolder: formData.cardHolder.trim() ? "" : "Cardholder name is required",
      cardNumber:
        formData.cardNumber.replace(/\s/g, "").length === 16
          ? ""
          : "Card number must be 16 digits",
      expiryMonth: formData.expiryMonth ? "" : "Can't be blank",
      expiryYear: formData.expiryYear ? "" : "Can't be blank",
      cvv: formData.cvv.length >= 3 ? "" : "CVV must be 3 digits",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      console.log("Form has errors. Please fix them.");
      return;
    }

    console.log("Form submitted successfully!", formData);
    onSubmit();
  };

  return (
    <section className="text-very-dark-violet p-8 mt-20 sm:mt-28 mx-auto md:my-36 lg:my-auto md:mx-auto max-w-92 col-span-3">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Cardholder Name */}
        <div className="flex flex-col gap-2 text-very-dark-violet">
          <label htmlFor="name" className="uppercase text-sm">
            Cardholder Name
          </label>
          <div className="p-0.5 rounded-lg focus-within:bg-gradient-to-r from-[hsl(249,99%,64%)] to-[hsl(278,94%,30%)]">
          <input
            type="text"
            id="name"
            maxLength={30}
            placeholder="e.g. Jane Appleseed"
            className={`border ${
              errors.cardHolder ? "border-primary-error" : "border-light-grayish-violet"
            } bg-white outline-none p-2 rounded-md w-full`}
            value={formData.cardHolder}
            onChange={handleCardholderChange}
          />
          </div>
          {errors.cardHolder && (
            <p className="text-primary-error text-xs">{errors.cardHolder}</p>
          )}
        </div>

        {/* Card Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="card-number" className="uppercase text-sm">
            Card Number
          </label>
          <div className="p-0.5 rounded-lg focus-within:bg-gradient-to-r from-[hsl(249,99%,64%)] to-[hsl(278,94%,30%)]">
          <input
            type="text"
            id="card-number"
            placeholder="eg. 1234 5678 9123 0000"
            maxLength={19}
            className={`border ${
              errors.cardNumber ? "border-primary-error" : "border-light-grayish-violet"
            } bg-white outline-none p-2 rounded-md w-full`}
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
          />
          </div>
          {errors.cardNumber && (
            <p className="text-primary-error text-xs">{errors.cardNumber}</p>
          )}
        </div>

        {/* Expiry Date */}
        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <label
              htmlFor="exp-month"
              className="uppercase text-sm text-nowrap"
            >
              Exp. date (MM/YY)
            </label>
            <div className="flex gap-2">
              <div className="space-y-2 w-full">
              <div className="p-0.5 rounded-lg focus-within:bg-gradient-to-r from-[hsl(249,99%,64%)] to-[hsl(278,94%,30%)]">
                <input
                  type="text"
                  id="exp-month"
                  placeholder="MM"
                  maxLength={2}
                  className={`border ${
                    errors.expiryMonth ? "border-primary-error" : "border-light-grayish-violet"
                  } bg-white outline-none p-2 rounded-md w-full`}
                  value={formData.expiryMonth}
                  onChange={handleExpiryMonthChange}
                  onBlur={(e) => {
                    if (e.target.value === "00") {
                      setFormData((prev) => ({ ...prev, expiryMonth: "" }));
                      setCardDetails((prev: any) => ({ ...prev, expiryMonth: "" }));
                    }
                  }}
                />
                </div>
                {errors.expiryMonth && (
                  <p className="text-primary-error text-xs">{errors.expiryMonth}</p>
                )}
              </div>
              <div className="space-y-2 w-full">
              <div className="p-0.5 rounded-lg focus-within:bg-gradient-to-r from-[hsl(249,99%,64%)] to-[hsl(278,94%,30%)]">
                <input
                  type="text"
                  id="exp-year"
                  placeholder="YY"
                  maxLength={2}
                  className={`border ${
                    errors.expiryYear ? "border-primary-error" : "border-light-grayish-violet"
                  } bg-white outline-none p-2 rounded-md w-full`}
                  value={formData.expiryYear}
                  onChange={handleExpiryYearChange}
                  onBlur={(e) => {
                    if (e.target.value === "00") {
                      setFormData((prev) => ({ ...prev, expiryYear: "" }));
                      setCardDetails((prev: any) => ({ ...prev, expiryYear: "" }));
                    }
                  }}
                />
                </div>
                {errors.expiryYear && (
                  <p className="text-primary-error text-xs">{errors.expiryYear}</p>
                )}
              </div>
            </div>
          </div>

          {/* CVV */}
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="cvc" className="uppercase text-sm">
              CVC
            </label>
            <div className="p-0.5 rounded-lg focus-within:bg-gradient-to-r from-[hsl(249,99%,64%)] to-[hsl(278,94%,30%)]">
            <input
              type="text"
              id="cvc"
              placeholder="eg. 123"
              maxLength={3}
              className={`border ${
                errors.cvv ? "border-primary-error" : "border-light-grayish-violet"
              } bg-white outline-none p-2 rounded-md w-full`}
              value={formData.cvv}
              onChange={handleCvvChange}
            />
            </div>
            {errors.cvv && (
              <p className="text-primary-error text-xs">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-very-dark-violet hover:bg-very-dark-violet/85 text-white p-3 rounded-lg mt-2"
        >
          Confirm
        </button>
      </form>
    </section>
  );
};

export default CardForm;