const Ice = (props) => {

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
                <path d="M74.977,61.269l-6.212-3.587l3.535-0.947c1.067-0.286,1.7-1.383,1.414-2.449c-0.285-1.066-1.384-1.705-2.449-1.414
		l-7.398,1.982l-5.493-3.171l6.533-1.751c0.825-0.221,1.419-0.941,1.478-1.794c0.059-0.852-0.43-1.647-1.217-1.979l-5.763-2.436
		l4.463-2.577l7.396,1.981c0.174,0.047,0.348,0.069,0.519,0.069c0.884,0,1.691-0.59,1.931-1.483
		c0.286-1.067-0.348-2.164-1.414-2.449l-3.532-0.946l6.211-3.586c0.957-0.553,1.284-1.775,0.733-2.732
		c-0.554-0.957-1.777-1.285-2.733-0.732l-6.21,3.585l0.945-3.53c0.286-1.067-0.348-2.164-1.414-2.449
		c-1.074-0.29-2.163,0.348-2.449,1.414l-1.98,7.394l-4.463,2.577l0.771-6.207c0.1-0.798-0.288-1.577-0.984-1.979
		c-0.695-0.4-1.566-0.347-2.206,0.137l-4.988,3.771v-5.152l5.412-5.412c0.781-0.781,0.781-2.047,0-2.828
		c-0.781-0.781-2.047-0.781-2.828,0l-2.584,2.584V18c0-1.104-0.896-2-2-2c-1.105,0-2,0.896-2,2v7.174l-2.587-2.588
		c-0.781-0.781-2.047-0.781-2.828,0c-0.781,0.78-0.781,2.047,0,2.828l5.415,5.416v5.15l-4.991-3.777
		c-0.682-0.516-1.615-0.541-2.323-0.064c-0.709,0.477-1.037,1.352-0.815,2.177l1.752,6.54l-5.493-3.171l-1.983-7.396
		c-0.285-1.066-1.383-1.703-2.449-1.414c-1.067,0.286-1.7,1.383-1.414,2.449l0.946,3.531l-6.211-3.586
		c-0.959-0.553-2.18-0.225-2.732,0.732c-0.552,0.957-0.225,2.18,0.732,2.732l6.21,3.585l-3.53,0.946
		c-1.067,0.286-1.7,1.383-1.414,2.449c0.239,0.894,1.047,1.483,1.931,1.483c0.171-0.001,0.346-0.022,0.519-0.069l7.394-1.981
		l5.492,3.171l-6.529,1.75c-0.825,0.221-1.419,0.941-1.477,1.794c-0.059,0.852,0.43,1.647,1.217,1.979l5.76,2.436l-4.464,2.577
		l-7.391-1.981c-1.065-0.289-2.164,0.348-2.449,1.414c-0.286,1.066,0.347,2.163,1.414,2.449l3.527,0.946l-6.208,3.584
		c-0.957,0.553-1.284,1.775-0.732,2.732c0.371,0.642,1.043,1,1.734,1c0.339,0,0.684-0.086,0.998-0.268l6.213-3.587l-0.947,3.535
		c-0.286,1.066,0.347,2.163,1.414,2.449c0.173,0.047,0.348,0.069,0.518,0.069c0.883,0,1.691-0.59,1.931-1.483l1.982-7.398
		l4.461-2.575l-0.771,6.208c-0.1,0.797,0.288,1.576,0.984,1.979c0.696,0.4,1.566,0.347,2.206-0.137L46,60.018v5.153l-5.415,5.415
		c-0.781,0.781-0.781,2.047,0,2.828c0.781,0.781,2.047,0.781,2.828,0L46,70.827V78c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2v-7.171
		l2.585,2.585C52.976,73.805,53.487,74,53.999,74c0.512,0,1.023-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828L50,65.173
		v-5.152l4.994,3.777c0.355,0.269,0.78,0.405,1.206,0.405c0.39,0,0.779-0.113,1.117-0.341c0.709-0.478,1.036-1.353,0.814-2.178
		l-1.754-6.535l5.494,3.172l1.979,7.392c0.239,0.894,1.047,1.483,1.931,1.483c0.171,0,0.345-0.022,0.519-0.069
		c1.066-0.285,1.7-1.382,1.414-2.449l-0.944-3.528l6.208,3.584c0.316,0.182,0.659,0.268,0.998,0.268c0.691,0,1.363-0.358,1.734-1
		C76.262,63.044,75.935,61.821,74.977,61.269z M58.247,47.575l-4.772,1.279L51.996,48l3.067-1.771L58.247,47.575z M53.625,38.252
		l-0.561,4.512l-3.065,1.77v-3.539L53.625,38.252z M43.24,38.909l2.759,2.087v3.542l-1.48-0.854L43.24,38.909z M37.747,48.425
		l4.769-1.278L43.994,48l-3.065,1.771L37.747,48.425z M42.37,57.747l0.56-4.513L46,51.462v3.541L42.37,57.747z M52.758,57.092
		L50,55.007v-3.54l1.477,0.854L52.758,57.092z"/>
            </g>
        </svg>
    )
}

export default Ice