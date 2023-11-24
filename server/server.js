let http = require('http');
const { URL } = require('url');

// 이 안에서만 함수의 역할을 할 수 있기 때문에 밖으로 빼내줘야 함
function start(route, handle) {
    function onRequest(request, response) {
        if (!request.url.includes("favicon.ico")) {
            let parsedUrl = new URL(request.url, `http://${request.headers.host}`).pathname;
            let queryData = new URL(request.url, `http://${request.headers.host}`).searchParams;


            route(parsedUrl, handle, response, queryData.get('productId'));
        }
    }

    http.createServer(onRequest).listen(8888);
    //localhost:8888
}

//start라는 함수를 밖에서도 사용할 수 있게 해줌
exports.start = start;