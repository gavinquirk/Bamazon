
var mysql = require('mysql')
var inq = require('inquirer')
var prompt = inq.createPromptModule();
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'bamazon',
})


var managerQchoices = [
    'View products for sale',
    'View low inventory',
    'Add to inventory',
    'Add new product'
]

var managerPrompt = [
    {
        type: 'list',
        name: 'managerQ',
        message: 'Select an option from below',
        choices: managerQchoices
    }
]

prompt(managerPrompt).then(function (r) {

    var choice = r.managerQ

    switch (choice) {
        case 'View products for sale':
            connection.query('SELECT * FROM products', function (e, r) {
                for (var i = 0; i < r.length; i++) {
                    console.log('\n')
                    console.log('Item ID: ' + r[i].item_id)
                    console.log('Product: ' + r[i].product_name)
                    console.log('Department: ' + r[i].department_name)
                    console.log('Price: ' + r[i].price)
                    console.log('Quantity: ' + r[i].stock_quantity)
                    console.log('\n')
                }
            })
            break

        case 'View low inventory':
            connection.query('SELECT * FROM products WHERE stock_quantity<150', function (e, r) {
                for (var i = 0; i < r.length; i++) {
                    console.log('\n')
                    console.log('Item ID: ' + r[i].item_id)
                    console.log('Product: ' + r[i].product_name)
                    console.log('Department: ' + r[i].department_name)
                    console.log('Price: ' + r[i].price)
                    console.log('Quantity: ' + r[i].stock_quantity)
                    console.log('\n')
                }
            })
            break

        case 'Add to inventory':
            console.log("Passed<br />")
            var 
            break

        case 'Add new product':
            console.log("Not so good<br />")
            break

        default:
            console.log('No choice made')
    }
}).then(function () {
    connection.end(function (e) {
        if (e) throw e
    })
})