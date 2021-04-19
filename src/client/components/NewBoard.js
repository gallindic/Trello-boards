import { CardContainer, Title, InputContainer } from './Board';

export default function NewBoard(props) {

    const InsertBoardToDB = (board) => {
        fetch("http://localhost:5000/boards/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: board})
        })
        .then(response => response.json())
        .then(data => {
            let newBoard = {
                id: data.id,
                content: data.name
            };

            props.onBoardAdd(newBoard);
        })
        .catch(err => console.log(err));
    }

    return(
        <CardContainer>
            <Title title="Add board"/>
            <InputContainer showInput={true} placeholder={"Board name"} handleSubmit={(name) => InsertBoardToDB(name) } />
        </CardContainer>
    );
}