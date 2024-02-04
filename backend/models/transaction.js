
module.exports = (sequelize, Sequelize) => {
    const transaction = sequelize.define('transaction', {
        accountMask: { type: Sequelize.STRING, allowNull: false },
        postedDate: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING, allowNull: false },
        details: { type: Sequelize.STRING, allowNull: false },
        amount: { type: Sequelize.INTEGER, allowNull: false },
        balance: { type: Sequelize.INTEGER, allowNull: false },
        referenceNumber: { type: Sequelize.STRING, allowNull: true },
        currency: { type: Sequelize.STRING, allowNull: false },
        type: { type: Sequelize.STRING, allowNull: false },
      })
      return transaction
  };