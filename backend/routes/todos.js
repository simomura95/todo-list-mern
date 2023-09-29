import express from "express"
import mongoose from "mongoose"
import {List, Item} from "../models/userModel.js"
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router()

//require auth for all workout routes
router.use(requireAuth)

// support functions
function findUserList(user, listId) {
  if (!mongoose.Types.ObjectId.isValid(listId)) {
    throw Error('No such list')
  }
  const list = user.todoLists.find(list => list._id.equals(new mongoose.Types.ObjectId(listId)))
  if (!list) {
    throw Error('No such list')
  }

  return {"list": list}
}

function findUserListItem(user, listId, itemId) {
  const {list} = findUserList(user, listId)

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw Error('No such item')
  }
  const item = list.items.find(item => item._id.equals(new mongoose.Types.ObjectId(itemId)))
  if (!item) {
    throw Error('No such item')
  }

  return {"list": list, "item": item}
}


// ---------------------------------------------------------------------------------------------------------------


// Get all lists of a user
router.get('/', (req, res) => {
  const user = req.user
  const lists = user.todoLists

  res.status(200).json(lists)
})

// Add a list to user
router.post('/', async(req, res) => {
  let user = req.user

  // add list
  const { newListTitle } = req.body
  if (!newListTitle) {
    return res.status(404).json({error: 'Please provide a title for the list'})
  }

  try {
    const newList = new List({ title: newListTitle, isChecked: false })
    user.todoLists.push(newList)
    user = await user.save()
    res.status(200).json(newList)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete user's list
router.delete('/:listId', async(req, res) => {
  let user = req.user
  const { listId } = req.params
  try {
    const { list: listToDelete} = findUserList(user, listId)

    // find and delete list
    const results = user.todoLists.filter(list => JSON.stringify(list) !== JSON.stringify(listToDelete))
    user.todoLists = results
    await user.save()

    res.status(200).json(listToDelete)
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})

// Edit list name
router.patch('/:listId', async(req, res) => {
  let user = req.user
  const { listId } = req.params
  const { newText } = req.body
  try {
    if (!newText) {
      return res.status(400).json({ error: "Please provide a title for the list" })
    }
    const { list: listToEdit } = findUserList(user, listId)

    listToEdit.title = newText
    await user.save()

    res.status(200).json(listToEdit)
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})

// // Check list
// router.patch('/:listId/check', async(req, res) => {
//   let user = req.user
//   const { listId } = req.params
//   try {
//     let { list: listToCheck } = findUserList(user, listId)

//     listToCheck.isChecked = !listToCheck.isChecked
//     await user.save()

//     res.status(200).json({listToCheck})
//   } catch(error) {
//     res.status(400).json({ error: error.message })
//   }
// })

// Get a single list of user and its items
router.get('/:listId', (req, res) => {
  const user = req.user
  const { listId } = req.params
  try {
    const { list } = findUserList(user, listId)
    res.status(200).json(list)
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})

// Add an item to user's list
router.post('/:listId', async(req, res) => {
  let user = req.user
  const { listId } = req.params
  const { newTodo: itemText } = req.body
  if (!itemText) {
    return res.status(404).json({ error: 'Please provide a text for the item' })
  }

  try {
    const { list } = findUserList(user, listId)
    const newItem = new Item({ text: itemText, isChecked: false })
    list.items.push(newItem)
    user = await user.save()
    res.status(200).json(newItem)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete item from user's list
router.delete('/:listId/:itemId', async(req, res) => {
  let user = req.user
  const { listId, itemId } = req.params
  try {
    const { list, item: itemToDelete } = findUserListItem(user, listId, itemId)

    const results = list.items.filter(item => JSON.stringify(item) !== JSON.stringify(itemToDelete))
    list.items = results
    await user.save()

    res.status(200).json(itemToDelete)
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})

// Edit item
router.patch('/:listId/:itemId', async(req, res) => {
  let user = req.user
  const { listId, itemId } = req.params
  const { newText } = req.body
  try {
    const { list, item: itemToEdit } = findUserListItem(user, listId, itemId)

    itemToEdit.text = newText
    await user.save()

    res.status(200).json(list.items)
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})

// Check item
router.patch('/:listId/:itemId/check', async(req, res) => {
  let user = req.user
  const { listId, itemId } = req.params
  try {
    const { list, item: itemToCheck } = findUserListItem(user, listId, itemId)

    itemToCheck.isChecked = !itemToCheck.isChecked
    await user.save()

    // res.status(200).json(itemToCheck)
    res.status(200).json(list.items)
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})

export default router