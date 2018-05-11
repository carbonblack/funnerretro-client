const initialState = {
    columns: [
        {
            id: "1",
            name: "column 1",
            cards: [
                {
                    id: "1",
                    text: "Hello",
                    votes: 2
                },
                {
                    id: "2",
                    text: "Hello 2",
                    votes: 5
                },
                {
                    id: "3",
                    text: "Hello 3",
                    votes: 6
                } 
            ]
        },
        {
            id: "2",
            name: "column 2",
            cards: [
                {
                    id: "4",
                    text: "Hello",
                    votes: 2
                },
                {
                    id: "5",
                    text: "Hello 2",
                    votes: 5
                },
                {
                    id: "6",
                    text: "Hello 3",
                    votes: 6
                } 
            ]
        }
    ],
    name: ''
}

const board = (state = initialState, action) => {
    return state
}

export default board
