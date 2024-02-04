const express = require('express')
const multer = require('multer')
const transactionHandler = require('./handlers/transaction')
const cors = require("cors")
const db = require("./models/index");

const app = express()
const port = 8081

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors())

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

db.sequelize.sync()
  .then(async () => {
    try {
      // await transactionHandler.deleteAll()
      console.log("Synced db.")
    } catch (deleteError) {
      console.error("Error deleting transactions after synchronization:", deleteError)
      throw deleteError
    }
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer.toString('utf8')
    const rows = fileBuffer
      .split('\n')
      .map(row => row.replace(/\r/g, '').split(','))
      .filter(row => row.length > 1)
    
    rows.shift()

    const addedReferenceNumbersSet = new Set();

    for (const row of rows) {
      const referenceNumber = row[6] === 'null' ? null : row[6]
      await transactionHandler.add({
        accountMask: row[0],
        postedDate: row[1],
        description: row[2],
        details: row[3],
        amount: parseInt(row[4]),
        balance: parseInt(row[5]),
        referenceNumber,
        currency: row[7],
        type: row[8],
      })
      addedReferenceNumbersSet.add(referenceNumber)
    }

    // const transactions = await transactionHandler.findAll()
    const transactions = await transactionHandler.findByReferenceNumbers(Array.from(addedReferenceNumbersSet));

    
    res.json(transactions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
