export default function RatingStars({
  rating,
  size = "text-sm",
}: {
  rating: number;
  size?: string;
}) {
  return (
    <span className={`${size} leading-none`} aria-label={`5 üzerinden ${rating} puan`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= Math.round(rating) ? "text-amber-400" : "text-slate-300"}
        >
          ★
        </span>
      ))}
    </span>
  );
}
