"use client";

import {
  useEffect,
  useState,
} from "react";

export default function CourseReviews({
  courseSlug,
}: {
  courseSlug: string;
}) {
  const [review, setReview] =
    useState("");
    useEffect(() => {
  const savedReviews =
    JSON.parse(
      localStorage.getItem(
        `reviews_${courseSlug}`
      ) || "[]"
    );

  setReviews(savedReviews);
}, [courseSlug]);
    const submitReview = () => {
        if (!review.trim()) {
  alert(
    "Please write a review"
  );
  return;
}
  const userName =
    localStorage.getItem(
      "userName"
    ) || "Student";

  const existingReviews =
    JSON.parse(
      localStorage.getItem(
        `reviews_${courseSlug}`
      ) || "[]"
    );

  const newReview = {
    userName,
    rating,
    review,
  };

  localStorage.setItem(
    `reviews_${courseSlug}`,
    JSON.stringify([
      ...existingReviews,
      newReview,
    ])
  );
  setReviews([
  ...existingReviews,
  newReview,
]);

  setReview("");
  setRating(5);
};
    const [rating, setRating] =
  useState(5);
  const [reviews, setReviews] =
  useState<
    {
      userName: string;
      rating: number;
      review: string;
    }[]
  >([]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">
        Reviews
      </h2>
      <div className="mt-4 flex gap-2">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      type="button"
      onClick={() =>
        setRating(star)
      }
      className="text-2xl"
    >
      {star <= rating
        ? "★"
        : "☆"}
    </button>
  ))}
</div>

      <textarea
        value={review}
        onChange={(e) =>
          setReview(e.target.value)
        }
        placeholder="Write your review..."
        className="border rounded-lg p-3 w-full mt-4"
        rows={4}
      />

    <button
  onClick={submitReview}
  className="mt-4 bg-black text-white px-4 py-2 rounded"
>
  Submit Review
</button>
<div className="mt-8">
  {reviews.map(
    (reviewItem, index) => (
      <div
        key={index}
        className="border rounded-lg p-4 mb-4"
      >
        <p className="font-semibold">
          {reviewItem.userName}
        </p>

        <p>
          {"★".repeat(
            reviewItem.rating
          )}
        </p>

        <p className="mt-2">
          {reviewItem.review}
        </p>
      </div>
    )
  )}
</div>
    </div>
  );
}