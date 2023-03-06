export default function CopyField({ value, label }) {
  function handleCopy(event) {
    event.preventDefault();
    navigator.clipboard.writeText(value);
  }

  return (
    <form onSubmit={(event) => handleCopy(event)}>
      <label htmlFor="copyfield">{label}</label>
      <input name="copyfield" readOnly={true} value={value} />
      <button type="submit">copy</button>
    </form>
  );
}
