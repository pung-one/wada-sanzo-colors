export default function CopyField({ value, label, onClick }) {
  return (
    <form onSubmit={() => onClick(value)}>
      <label htmlFor="copyfield">{label}</label>
      <input name="copyfield" readOnly={true} value={value} />
      <button type="submit">copy</button>
    </form>
  );
}
