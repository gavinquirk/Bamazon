
var mysql = require('mysql')
var inq = require('inquirer')
var prompt = inq.createPromptModule();
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'bamazon',
})

connection.connect(function (e) {
    if (e) throw e
    console.log('connected!')
    connection.query('SELECT * FROM products', function (e, r) {
        if (e) throw e

        // Initial list of items
        for (var i = 0; i < r.length; i++) {
            console.log('Item ID: ' + r[i].item_id)
            console.log('Product: ' + r[i].product_name)
            // console.log('Department: ' + r[i].department_name)
            console.log('Price: ' + r[i].price)
            // console.log('Quantity: ' + r[i].stock_quantity)
            console.log('\n')
        }

        var purchasePrompt = [
            {
                type: 'input',
                name: 'purchaseId',
                message: 'What is the ID of the product you would like?'

            },
            {
                type: 'input',
                name: 'purchaseAmount',
                message: 'How many would you like to purchase?'

            }
        ]

        prompt(purchasePrompt).then(function (res) {
            var purchaseId = res.purchaseId
            var purchaseAmount = res.purchaseAmount

            connection.query('SELECT * FROM bamazon.products WHERE item_id=' + purchaseId, function (e, r) {
                if (e) throw e
                // console.log(r[0])
                var stockQuantity = r[0].stock_quantity

                if (purchaseAmount > stockQuantity) {
                    console.log("Not enough in stock! Your order will did not go through!")

                } else {
                    console.log("Items Purchased")
                    stockQuantity = stockQuantity - purchaseAmount
                    connection.query('UPDATE bamazon.products SET stock_quantity =' + stockQuantity + ' WHERE item_id = ' + purchaseId)
                    var price = r[0].price
                    var total = purchaseAmount * price
                    var productName = r[0].product_name
                    console.log("You spent $" + total + " on " + purchaseAmount + " units of " + productName)
                }
                connection.end(function (e) {
                    if (e) throw e
                })

            })


            // if (purchaseAmount > r.stock_quantity) {
            //     console.log('!!!')
            // } else {
            //     connection.query('SELECT * FROM products WHERE item_id=', function (e, r) {

            //     })
            // }

        })






    })





    // END CONNECTION
    // connection.end(function (e) {
    //     if (e) throw e
    // })
})