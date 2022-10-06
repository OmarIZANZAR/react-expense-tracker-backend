const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1})

        return res.status(200).json({
            error: false,
            message: "get all transactions",
            data: transactions
        })
    } catch (error) {
        console.log("GET_TRANSACTIONS_ERROR", error)
        return res.status(500).json({ error: true, message: "server error"})
    }
})

router.post('/', async (req, res) => {
    try {
        const {text, amount} = req.body

        const transaction = await Transaction.create({text,amount})

        return res.status(201).json({
            error: false,
            message: "transaction created",
            data: transaction
        })
    } catch (error) {
        console.log("CREATE_TRANSACTION_ERROR", error)

        if(error.name == "ValidationError") {
            return res.status(400).json({
                error: true,
                message: "please enter valid info",
            })
        }

        return res.status(500).json({ error: true, message: "server error"})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById( req.params.id )

        if(!transaction){
            return res.status(404).json({
                error: true,
                message: "transaction not found",
            })
        }

        await transaction.remove()

        return res.status(200).json({
            error: false,
            message: "transaction deleted",
        })
    } catch (error) {
        console.log("DELETE_TRANSACTION_ERROR", error)
        return res.status(500).json({ error: true, message: "server error"})
    }
})

module.exports = router;