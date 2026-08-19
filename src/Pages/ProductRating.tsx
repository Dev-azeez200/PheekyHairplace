import { useState } from "react";

interface ProductRatingProps {
  productId: number;
  rating: number;
  reviews: number;
  onRate?: (rating: number) => void;
}

const ProductRating = ({ productId, reviews, onRate }: ProductRatingProps) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (value: number) => {
    setSelectedRating(value);

    if (onRate) {
      onRate(value);
    }

    console.log(`Product ${productId} rated ${value} stars`);
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-dark">({reviews} reviews)</span>
      </div>

      {/* Customer rating */}
      <div className="mt-2">
        <p className="mb-1 text-xs text-dark">Rate this product</p>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-xl transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              <span
                className={
                  star <= (hoverRating || selectedRating)
                    ? "text-primary"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>

        {selectedRating > 0 && (
          <p className="mt-1 text-xs text-dark/60">
            You rated this product {selectedRating} star
            {selectedRating > 1 ? "s" : ""}.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductRating;
