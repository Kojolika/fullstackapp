import '../../Styles/toolTip.css';
import '../../Styles/app.css';
import { useState } from 'react';

const ToolTip = (props) => {
    const text = props.text;
    const itemToHoverOver = props.item;

    const [isOpen, setIsOpen] = useState(false);

    const handleMouseOver = () => {
        setIsOpen(true)
    }
    const handleMouseLeave = () => {
        setIsOpen(false)
    }
    return <div className="tooltip" onMouseOver={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()}>
        {itemToHoverOver}
        <div className={isOpen ? "tooltip-text border tooltip-color visible " : "tooltip-text border tooltip-color hidden "}>
            <div className='arrow tooltip-color '></div>
            {text}
        </div>
    </div>

}

export default ToolTip