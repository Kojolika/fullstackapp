const Showers = (props) => {

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
                <path d="M48,78c-1.105,0-2,0.896-2,2v4c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-4C50,78.896,49.104,78,48,78z M39,72
		c-1.105,0-2,0.896-2,2v4c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-4C41,72.896,40.104,72,39,72z M57,72c-1.105,0-2,0.896-2,2v4
		c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-4C59,72.896,58.104,72,57,72z M66,40c-0.508,0-1.112,0.079-1.689,0.184
		C62.218,33.012,55.663,28,48,28c-7.664,0-14.219,5.012-16.312,12.184C31.112,40.079,30.507,40,30,40c-6.065,0-11,4.935-11,11
		s4.935,11,11,11h7v4c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-4h14v4c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-4h7
		c6.065,0,11-4.935,11-11S72.065,40,66,40z M66,58H30c-3.859,0-7-3.141-7-7s3.141-7,7-7c0.277,0,0.723,0.068,1.193,0.162V46
		c0,1.104,0.895,2,2,2c1.105,0,2-0.896,2-2v-3.219C36.266,36.528,41.629,32,48,32c6.37,0,11.733,4.528,12.807,10.782V46
		c0,1.104,0.896,2,2,2s2-0.896,2-2v-1.837C65.277,44.069,65.726,44,66,44c3.859,0,7,3.141,7,7S69.859,58,66,58z M48,66
		c-1.105,0-2,0.896-2,2v4c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-4C50,66.896,49.104,66,48,66z"/>
            </g>
        </svg>


    )
}

export default Showers