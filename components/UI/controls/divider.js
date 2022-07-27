export default function Divider({ color, direction, customSize = null }) {
  if (direction === "horizontal")
    return (
      <div
        style={{
          height: 1,
          width: customSize === null ? "100%" : customSize,
          background: color,
        }}
      />
    );
  else if (direction === "vertical")
    return (
      <div
        style={{
          height: customSize === null ? "100%" : customSize,
          width: 1,
          background: color,
        }}
      />
    );
}
