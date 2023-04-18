const MostlyCloudyNight = (props) => {
    const height = props.height;
    const width = props.width;
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width={width === undefined ? "96px" : width}
            height={height === undefined ? "96px" : height}
            viewBox="0 0 96 96" enableBackground="new 0 0 96 96">
            <g id="Base" display="none">
            </g>
            <g id="Dibujo">
                <g>
                    <path d="M69.24,40.488C72.173,37.886,74,34.094,74,30c0-1.104-0.896-2-2-2c-5.514,0-10-4.486-10-10c0-1.104-0.896-2-2-2
			c-7.078,0-12.931,5.284-13.857,12.111c-6.848,0.737-12.533,5.488-14.454,12.072C31.112,40.079,30.507,40,30,40
			c-6.065,0-11,4.935-11,11s4.935,11,11,11h36c6.065,0,11-4.935,11-11C77,46.062,73.728,41.875,69.24,40.488z M58.168,20.168
			c0.934,5.985,5.675,10.728,11.66,11.664c-0.615,3.246-2.84,6.006-5.862,7.326c-2.154-5.948-7.447-10.206-13.792-11.008
			C50.933,24.111,54.126,20.92,58.168,20.168z M66,58H30c-3.859,0-7-3.141-7-7s3.141-7,7-7c0.277,0,0.724,0.068,1.194,0.162V46
			c0,1.104,0.896,2,2,2s2-0.896,2-2v-3.224C36.269,36.525,41.631,32,48,32c6.372,0,11.736,4.53,12.808,10.787V46
			c0,1.104,0.896,2,2,2s2-0.896,2-2v-1.837C65.278,44.069,65.726,44,66,44c3.859,0,7,3.141,7,7S69.859,58,66,58z"/>
                </g>
            </g>
        </svg>

    )
}

export default MostlyCloudyNight