import Input from './Input';

const CardContainer = elems => (
    <div className="rounded bg-gray-300 mx-1 w-64 p-2">
        {elems.children}
    </div>
);

const Title = ({title}) => (
    <div className="flex justify-between py-1">
        <h3 className="text-sm">{title}</h3>
        <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
    </div>
);

const InputContainer = ({showInput, handleSubmit, placeholder}) => (
    <div className={"mt-1 " + (showInput ? "block" : "hidden")}>
        <Input placeholder={placeholder} OnSubmitInput={handleSubmit}/>
    </div>
);

export { CardContainer, Title, InputContainer };