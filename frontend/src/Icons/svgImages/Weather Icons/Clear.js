const Clear = (props) => {
    const height = props.height;
    const width = props.width;
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width={width === undefined ? "96px" : width}
            height={height === undefined ? "96px" : height}
            viewBox="0 0 96 96" enable-background="new 0 0 96 96">
            <g id="Base" display="none">
            </g>
            <g id="Dibujo">
                <path d="M48,34c-7.72,0-14,6.28-14,14s6.28,14,14,14c7.72,0,14-6.28,14-14S55.72,34,48,34z M48,58c-5.514,0-10-4.486-10-10
		s4.486-10,10-10c5.514,0,10,4.486,10,10S53.514,58,48,58z"/>
            </g>
        </svg>

    )
}

export default Clear