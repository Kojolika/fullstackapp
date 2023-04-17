const Fog = (props) => {
    const height = props.height;
    const width = props.width;
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width={width === undefined ? "96px" : width}
            height={height === undefined ? "96px" : height}
            viewBox="0 0 96 96" enable-background="new 0 0 96 96" >
            <g id="Base" display="none">
            </g>
            <g id="Dibujo">
                <g>
                    <path d="M39,38h12c1.104,0,2-0.896,2-2s-0.896-2-2-2H39c-1.105,0-2,0.896-2,2S37.895,38,39,38z" />
                    <path d="M27,44h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H27c-1.105,0-2,0.896-2,2S25.895,44,27,44z" />
                    <path d="M20.999,50H45c1.104,0,2-0.896,2-2s-0.896-2-2-2H20.999c-1.105,0-2,0.896-2,2S19.894,50,20.999,50z" />
                    <path d="M80,54c0-1.104-0.896-2-2-2H18c-1.105,0-2,0.896-2,2s0.895,2,2,2h60C79.104,56,80,55.104,80,54z" />
                    <path d="M78,58H21c-1.105,0-2,0.896-2,2s0.895,2,2,2h57c1.104,0,2-0.896,2-2S79.104,58,78,58z" />
                    <path d="M39,64l-12-0.001c-1.105,0-2,0.896-2,2s0.895,2,2,2L39,68c1.104,0,2-0.896,2-2S40.104,64,39,64z" />
                    <path d="M58,44h8c1.104,0,2-0.896,2-2s-0.896-2-2-2h-8c-1.105,0-2,0.896-2,2S56.895,44,58,44z" />
                    <path d="M49,48c0,1.104,0.895,2,2,2h21c1.104,0,2-0.896,2-2s-0.896-2-2-2H51C49.895,46,49,46.896,49,48z" />
                    <path d="M72,63.999L45,64c-1.105,0-2,0.896-2,2s0.895,2,2,2l27-0.001c1.104,0,2-0.896,2-2S73.104,63.999,72,63.999z" />
                </g>
            </g>
        </svg>

    )
}

export default Fog