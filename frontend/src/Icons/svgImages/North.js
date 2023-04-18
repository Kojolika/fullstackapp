const North = (props) => {

    const height = props.height === undefined ? 24 : props.height;
    const width = props.width === undefined ? 24 : props.height;

    return (
        <svg style={{transform:"rotateZ(" + props.rotateDegree + "deg)"}} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height={height} viewBox="0 0 24 24" width={width} fill="#000000">
            <rect fill="none" height="24" width="24" /><path d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z" />
        </svg>
    )
}

export default North