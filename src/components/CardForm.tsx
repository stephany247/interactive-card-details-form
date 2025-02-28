import { useState } from "react";

interface CardFormProps {
  setCardDetails: (details: any) => void;
}

const CardForm = ({ setCardDetails }: CardFormProps) => {
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

  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "Cardholder name is required";
      valid = false;
    }
    if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
      valid = false;
    } else if (formData.cardHolder.length > 25) {
      newErrors.cardHolder = "Cardholder name must be less than 25 characters";
      valid = false;
    }
    if (
      !formData.expiryMonth ||
      Number(formData.expiryMonth) < 1 ||
      Number(formData.expiryMonth) > 12
    ) {
      newErrors.expiryMonth = "Month must be between 01 and 12";
      valid = false;
    }
    if (
      !formData.expiryYear ||
      Number(formData.expiryYear) < currentYear ||
      (Number(formData.expiryYear) === currentYear &&
        Number(formData.expiryMonth) < currentMonth)
    ) {
      newErrors.expiryYear = "Expiry date must be in the future";
      valid = false;
    }
    if (formData.cvv.length !== 3) {
      newErrors.cvv = "CVV must be exactly 3 digits";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let newValue = value;

    const fieldMap: { [key: string]: string } = {
      "card-number": "cardNumber",
      "exp-month": "expiryMonth",
      "exp-year": "expiryYear",
      cvc: "cvv",
      cardHolder: "cardHolder",
    };

    const fieldName = fieldMap[id] || id;

    if (fieldName !== "cardHolder") {
      newValue = newValue.replace(/\D/g, "");
    }

    if (fieldName === "cardNumber") {
      newValue = newValue
        .slice(0, 16)
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    }
    if (fieldName === "expiryMonth" && newValue.length > 2) {
      newValue = newValue.slice(0, 2);
    }
    if (fieldName === "expiryYear" && newValue.length > 2) {
      newValue = newValue.slice(0, 2);
    }
    if (fieldName === "cvv" && newValue.length > 3) {
      newValue = newValue.slice(0, 3);
    }

    setFormData((prev) => ({ ...prev, [fieldName]: newValue }));
    setCardDetails((prev: any) => ({ ...prev, [fieldName]: newValue }));
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      alert("Card details submitted successfully!");
    }
  };

  return (
    <section className="text-very-dark-violet mt-28 sm:mt-20 mx-6 mb-12">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 text-very-dark-violet">
          <label htmlFor="cardHolder" className="uppercase text-sm">
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardHolder"
            maxLength={30}
            placeholder="e.g. Jane Appleseed"
            className="border p-2 rounded-md w-full"
            value={formData.cardHolder}
            onChange={handleChange}
            aria-describedby="cardHolderError"
          />
          {errors.cardHolder && (
            <p id="cardHolderError" className="text-red-500 text-sm">
              {errors.cardHolder}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="card-number" className="uppercase text-sm">
            Card Number
          </label>
          <input
            type="text"
            id="card-number"
            placeholder="1234 5678 9123 0000"
            className="border p-2 rounded-md w-full"
            value={formData.cardNumber}
            onChange={handleChange}
            aria-describedby="cardNumberError"
          />
          {errors.cardNumber && (
            <p id="cardNumberError" className="text-red-500 text-sm">
              {errors.cardNumber}
            </p>
          )}
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="exp-month" className="uppercase text-sm">
              Exp. Date (MM/YY)
            </label>
            <div className="flex gap-2">
              <div className="space-y-2 w-full">
                <input
                  type="text"
                  id="exp-month"
                  placeholder="MM"
                  maxLength={2}
                  className="border p-2 rounded-md w-full"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  aria-describedby="expiryDateError"
                />
                {errors.expiryMonth && (
                  <p id="expiryDateError" className="text-red-500 text-sm">
                    {errors.expiryMonth}
                  </p>
                )}
              </div>
              <div className="space-y-2 w-full">
                <input
                  type="text"
                  id="exp-year"
                  placeholder="YY"
                  maxLength={2}
                  className="border p-2 rounded-md w-full"
                  value={formData.expiryYear}
                  onChange={handleChange}
                />
                {errors.expiryYear && (
                  <p className="text-red-500 text-sm">{errors.expiryYear}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="cvc" className="uppercase text-sm">
              CVV
            </label>
            <input
              type="text"
              id="cvc"
              placeholder="123"
              maxLength={3}
              className="border p-2 rounded-md w-full"
              value={formData.cvv}
              onChange={handleChange}
              aria-describedby="cvvError"
            />
            {errors.cvv && (
              <p id="cvvError" className="text-red-500 text-sm">
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-very-dark-violet text-white p-3 rounded-lg mt-2"
        >
          Confirm
        </button>
      </form>
    </section>
  );
};

export default CardForm;
