import express from 'express'
import { getNotes, getNote, addNotes, updateNote, deleteNote} from "./database.js"

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/notes', async(req, res) => {
    const result = await getNotes()
  res.send(result)
})

app.get('/note/:id', async(req, res) => {
    const id = req.params.id;
    const result = await getNote(id)
  res.send(result)
})

app.post("/notes",async(req, res) => {
    const {title,contents} = req.body;
    const result = await addNotes(title,contents)
  res.sendStatus(201)
})

app.put("/note/:id",async(req, res) => {
    const id = req.params.id;
    const {title,contents} = req.body;
    const result = await updateNote(id,title,contents)
  res.sendStatus(204)
})

app.delete("/note/:id",async(req, res) => {
    const id = req.params.id;
    const result = await deleteNote(id)
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})