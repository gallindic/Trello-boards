const express = require('express');
const router = express.Router();

// MongoDB Model
const Board = require('../models/Board');
const BoardItem = require('../models/BoardItem');

//Get all boards
router.get('/all', async (req, res) => {
	try {
		const boards = await Board.find();
		res.json(boards);
	} catch(err) {
		res.json({ message: err });
	}
});

router.get('/get-data', async (req, res) => {
	res.header("Content-Type",'application/json');

	const boards = await Board.find();
	const tasks = await BoardItem.find();

	const columns = boards.map(board => {
		const boardItems = async () => await BoardItem.find({"boardID": board.id});
		
		return boardItems().then(response => {
			let data = {
				'id': board.id,
				'name': board.name,
				'taskIds': response.map(item => item.id)
			};
	
			return data;
		});
	});

	Promise.all(columns).then(result => {
		const data = {
			'tasks': tasks,
			'columns': result
		};

		res.send(JSON.stringify(data, null, 2));
	});
});

//Insert board
router.post('/add', async (req, res) => {
	const boardsCount = await Board.countDocuments({});

	const board = new Board({
		id: boardsCount,
		name: req.body.name
	});

	try {
		const savedBoard = await board.save();
		console.log(savedBoard);
		res.json(savedBoard);
	} catch(err) {
		res.json({ message: err });
	}
});

//Delete board
router.post('/delete-board', async (req, res) => {
	try {
		const deletedItems = await BoardItem.deleteMany( { boardID: req.body.id });
		const deletedBoard = await Board.deleteOne( { id: req.body.id });

		res.json({items: deletedItems, board: deletedBoard});
	} catch (err) {
		res.json({message: err});
	}
});

//Insert board item
router.post('/add-item', async (req, res) => {
	const itemsCount = await BoardItem.countDocuments({});
	
	const boardItem = new BoardItem({ 
		id: itemsCount,
		boardID: req.body.boardID,
		name: req.body.name,
	});

	try{
		const savedBoardItem = await boardItem.save();
        res.json(savedBoardItem);
	} catch (err) {
		res.json({ message: err });
	}
});

//Delete board item
router.post('/delete-item', async (req, res) => {
	try {
		const deleted = await BoardItem.deleteOne( { id: req.body.id });
		res.json({deleted});
	} catch (err) {
		res.json({message: err});
	}
});

module.exports = router;