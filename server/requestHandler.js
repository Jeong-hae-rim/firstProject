const fs = require('fs');
const path = require('path');
const main_view = fs.readFileSync(path.join(__dirname, '../client/main.html'), 'utf-8');
const orderlist_view = fs.readFileSync(path.join(__dirname, '../client/orderlist.html'), 'utf-8');


const mariadb = require('./database/connect/mariadb');

function main(response) {

    mariadb.query('SELECT * FROM product', (error, rows) => {
        console.log(rows);
    });

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(main_view);
    response.end();
}

function login(response) {
    console.log('login');

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('login page');
    response.end();
}

function redRacket(response) {
    const filePath = path.join(__dirname, '../client/img/redRacket.png');

    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.error(err);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found');
        } else {
            response.writeHead(200, { 'Content-Type': 'image/png' });
            response.write(data);
        }
        response.end();
    });
}

function blueRacket(response) {
    const filePath = path.join(__dirname, '../client/img/blueRacket.png');

    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.error(err);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found');
        } else {
            response.writeHead(200, { 'Content-Type': 'image/png' });
            response.write(data);
        }
        response.end();
    });
}

function blackRacket(response) {
    const filePath = path.join(__dirname, '../client/img/blackRacket.png');

    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.error(err);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found');
        } else {
            response.writeHead(200, { 'Content-Type': 'image/png' });
            response.write(data);
        }
        response.end();
    });
}

function mainCss(response) {
    const filePath = path.join(__dirname, '../client/main.css');

    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.error(err);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
        }
        response.end();
    });
}

function orderListCss(response) {
    const filePath = path.join(__dirname, '../client/orderlist.css');

    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.error(err);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
        }
        response.end();
    });
}

function order(response, productId) {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    if (productId) {
        mariadb.query(`INSERT INTO orderlist VALUES ('${productId}', NOW());`);
    }

    mariadb.query('SELECT * FROM orderlist', (error, rows) => {
        response.write(orderlist_view); // Send the initial part of HTML
        response.write("<tbody>");

        rows.forEach(el => {
            console.log(el);
            response.write("<tr>"
                + `<td>${el.product_id}</td>`
                + `<td>${el.order_date}</td>`
                + "</tr>"
            );
        });

        response.write("</tbody>");
        response.write("</table>");
        response.end(); // Move response.end() here
    });
}

let handle = {} // key:value

// router
handle['/'] = main;
handle['/login'] = login;
handle['/order'] = order;

// image
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

// css
handle['/main.css'] = mainCss;
handle['/orderlist.css'] = orderListCss;

exports.handle = handle;