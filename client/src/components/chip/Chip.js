import "./Chip.css";

function Chip({ children, passedClass }) {
    return (
        <span className={`chip ${passedClass ? passedClass : ""}`}>{children}</span>
    );
}

export default Chip;
