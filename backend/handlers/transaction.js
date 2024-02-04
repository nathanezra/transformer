const db = require("../models")
const Transaction = db.transaction

// Create and Save a new Transaction
exports.add = async (transaction) => {
    try {
        const existingTransaction = await Transaction.findOne({
            where: { referenceNumber: transaction.referenceNumber } 
        })

        if (existingTransaction) {
            await existingTransaction.update(transaction)
        } else {
            await Transaction.create(transaction)
        }
    } catch (error) {
        console.error(eZrror)
    }
}

exports.findAll = async () => {
    try {
        return Transaction.findAll()
    } catch (error) {
        console.error(error)
    }
}

exports.findByReferenceNumbers = async (referenceNumber) => {
    try {
        return Transaction.findAll({
            where: { referenceNumber },
        });
    } catch (error) {
        console.error(error);
    }
}

exports.deleteAll = async () => {
    try {
        await Transaction.destroy({
            where: {},
            truncate: true
        });
    } catch (error) {
        console.error(error)
    }
};
