module.exports = function(app) {
     
    //Handle route "GET /", as in "http://localhost:8080/"
    app.get("/", function(request, response) {

      response.send("/public/index.html");    
    });

    
}


