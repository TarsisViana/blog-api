/* eslint-disable react/prop-types */
export default function Button({
    type = 'button',
    children,
}) {
    return (
        <button type={type}>
            {children}
        </button>
    );
}
