function route(pathname, handle, response, productId) {
    console.log('pathname: ' + pathname);

    //값을 누군가가 호출할 수 있게 함수처럼 쓰일 것이기 때문에 ()를 붙임
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, productId);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('404 page');
        response.end();
    }
}

exports.route = route;