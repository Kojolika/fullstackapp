const FreezingRain = (props) => {

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
                    <path d="M66,40c-0.507,0-1.112,0.079-1.688,0.184C62.217,33.012,55.663,28,48,28s-14.218,5.012-16.311,12.184
			C31.112,40.079,30.507,40,30,40c-6.065,0-11,4.935-11,11s4.935,11,11,11c1.104,0,2-0.896,2-2s-0.896-2-2-2c-3.86,0-7-3.141-7-7
			s3.14-7,7-7c0.277,0,0.723,0.068,1.193,0.162V46c0,1.104,0.896,2,2,2s2-0.896,2-2v-3.221C36.267,36.527,41.63,32,48,32
			s11.732,4.527,12.807,10.779V46c0,1.104,0.896,2,2,2s2-0.896,2-2v-1.838C65.277,44.068,65.722,44,66,44c3.859,0,7,3.141,7,7
			s-3.141,7-7,7c-1.104,0-2,0.896-2,2s0.896,2,2,2c6.065,0,11-4.935,11-11S72.065,40,66,40z"/>
                    <path d="M49.485,52.06c-1.073-0.27-2.158,0.384-2.426,1.455l-6,24c-0.268,1.072,0.384,2.157,1.455,2.426
			C42.677,79.981,42.84,80,43.001,80c0.896,0,1.711-0.606,1.939-1.515l6-24C51.208,53.413,50.557,52.328,49.485,52.06z"/>
                    <path d="M57.484,58.06c-1.072-0.271-2.157,0.384-2.425,1.455l-3,12c-0.268,1.072,0.384,2.158,1.456,2.426
			c0.163,0.041,0.326,0.06,0.486,0.06c0.896,0,1.712-0.606,1.939-1.515l2.999-12C59.208,59.413,58.556,58.327,57.484,58.06z"/>
                    <path d="M38.484,58.06c-1.069-0.271-2.157,0.384-2.425,1.455l-3,12c-0.268,1.072,0.384,2.158,1.456,2.426
			c0.163,0.041,0.326,0.06,0.486,0.06c0.896,0,1.712-0.606,1.939-1.515l3-12C40.208,59.413,39.556,58.327,38.484,58.06z"/>
                </g>
            </g>
        </svg>

    )
}

export default FreezingRain