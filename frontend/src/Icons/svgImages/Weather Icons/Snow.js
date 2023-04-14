import React from 'react'

const Snow = (props) => {

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
                <g>
                    <path d="M66,40c-0.507,0-1.112,0.079-1.688,0.184C62.218,33.012,55.663,28,48,28s-14.218,5.012-16.311,12.184
			C31.112,40.079,30.507,40,30,40c-6.065,0-11,4.935-11,11s4.935,11,11,11c1.104,0,2-0.896,2-2s-0.896-2-2-2c-3.86,0-7-3.141-7-7
			s3.14-7,7-7c0.277,0,0.723,0.068,1.193,0.162V46c0,1.104,0.896,2,2,2s2-0.896,2-2v-3.221C36.268,36.527,41.631,32,48,32
			s11.732,4.527,12.807,10.779V46c0,1.104,0.896,2,2,2s2-0.896,2-2v-1.838C65.277,44.068,65.723,44,66,44c3.859,0,7,3.141,7,7
			s-3.141,7-7,7c-1.104,0-2,0.896-2,2s0.896,2,2,2c6.065,0,11-4.935,11-11S72.065,40,66,40z"/>
                    <path d="M45.732,62.464c-0.551-0.956-1.775-1.284-2.732-0.733c-0.957,0.553-1.284,1.775-0.732,2.732l1,1.732
			c0.37,0.642,1.042,1,1.734,1c0.339,0,0.683-0.086,0.998-0.268c0.957-0.553,1.284-1.775,0.732-2.732L45.732,62.464z"/>
                    <path d="M40.732,53.804C40.18,52.848,38.956,52.52,38,53.071c-0.957,0.553-1.284,1.775-0.732,2.732l1,1.732
			c0.37,0.642,1.042,1,1.734,1c0.339,0,0.683-0.086,0.998-0.267c0.957-0.553,1.284-1.775,0.732-2.733L40.732,53.804z"/>
                    <path d="M43,58.269c0.315,0.182,0.659,0.267,0.998,0.267c0.691,0,1.364-0.358,1.734-1l1-1.732c0.552-0.957,0.225-2.18-0.732-2.732
			c-0.957-0.552-2.181-0.224-2.732,0.732l-1,1.732C41.716,56.493,42.043,57.716,43,58.269z"/>
                    <path d="M41,61.731c-0.957-0.552-2.18-0.224-2.732,0.733l-1,1.732c-0.552,0.957-0.225,2.18,0.732,2.732
			c0.315,0.182,0.659,0.268,0.998,0.268c0.691,0,1.364-0.358,1.734-1l1-1.732C42.284,63.507,41.957,62.284,41,61.731z"/>
                    <path d="M40,60c0-1.104-0.896-2-2-2h-2c-1.104,0-2,0.896-2,2s0.896,2,2,2h2C39.104,62,40,61.104,40,60z" />
                    <path d="M50,60c0-1.104-0.896-2-2-2h-2c-1.104,0-2,0.896-2,2s0.896,2,2,2h2C49.104,62,50,61.104,50,60z" />
                    <path d="M60.732,71.268c-0.551-0.956-1.776-1.284-2.732-0.732c-0.957,0.553-1.284,1.775-0.732,2.732l1,1.732
			c0.37,0.642,1.042,1,1.734,1c0.339,0,0.683-0.086,0.998-0.268c0.957-0.553,1.284-1.775,0.732-2.732L60.732,71.268z"/>
                    <path d="M55.732,62.607c-0.552-0.956-1.775-1.284-2.732-0.732c-0.957,0.553-1.284,1.775-0.732,2.732l1,1.732
			c0.37,0.642,1.042,1,1.734,1c0.339,0,0.683-0.086,0.998-0.267c0.957-0.553,1.284-1.775,0.732-2.733L55.732,62.607z"/>
                    <path d="M58,67.072c0.315,0.182,0.659,0.267,0.998,0.267c0.691,0,1.364-0.358,1.734-1l1-1.732c0.552-0.957,0.225-2.18-0.732-2.732
			c-0.957-0.552-2.18-0.224-2.732,0.732l-1,1.732C56.716,65.297,57.043,66.52,58,67.072z"/>
                    <path d="M56,70.535c-0.957-0.552-2.18-0.224-2.732,0.732l-1,1.732c-0.552,0.957-0.225,2.18,0.732,2.732
			C53.315,75.914,53.659,76,53.998,76c0.691,0,1.364-0.358,1.734-1l1-1.732C57.284,72.311,56.957,71.088,56,70.535z"/>
                    <path d="M55,68.804c0-1.104-0.896-2-2-2h-2c-1.104,0-2,0.896-2,2s0.896,2,2,2h2C54.104,70.804,55,69.908,55,68.804z" />
                    <path d="M63,66.804h-2c-1.104,0-2,0.896-2,2s0.896,2,2,2h2c1.104,0,2-0.896,2-2S64.104,66.804,63,66.804z" />
                </g>
            </g>
        </svg>

    )
}

export default Snow