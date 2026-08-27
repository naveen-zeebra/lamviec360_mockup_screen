export default function Avatar({ src, name = "", size = 40, shape = "circle" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const radius = shape === "circle" ? "50%" : "var(--radius-md)";
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          objectFit: "cover",
          border: "1px solid var(--border-default)",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: "var(--blue-100)",
        color: "var(--blue-700)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: size * 0.38,
      }}
    >
      {initials || "?"}
    </div>
  );
}
