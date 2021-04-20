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
                name: data.name,
                taskIds: []
            };

            props.onBoardAdd(newBoard);
        })
        .catch(err => console.log(err));
    }

    return(
        <CardContainer>
            <Title title="Add board" visible={false}/>
            <InputContainer showInput={true} placeholder={"Board name"} handleSubmit={(name) => InsertBoardToDB(name) } />
        </CardContainer>
    );
}