import { PromiseProvider } from 'mongoose';
import Input from './Input';

const CardContainer = elems => (
    <div className="rounded bg-gray-300 mx-1 w-64 p-2">
        {elems.children}
    </div>
);

const Title = ({title, deleteEventHandler, visible=true}) => (
    <div className="flex items-center justify-between py-1">
        <h3 className="text-sm">{title}</h3>
        { visible ? <div className="text-xs font-bold cursor-pointer" onClick={ deleteEventHandler }>x</div> : <div></div> }
        
    </div>
);

const InputContainer = ({showInput, handleSubmit, placeholder}) => (
    <div className={"mt-1 " + (showInput ? "block" : "hidden")}>
        <Input placeholder={placeholder} OnSubmitInput={handleSubmit}/>
    </div>
);

export { CardContainer, Title, InputContainer };