// eslint-disable-next-line react/prop-types
export default function InputField({ type, name, children }) {
  return (
    <label>
      {children}
      <input
        type={type}
        name={name}
        required
      />
    </label>
  );
}