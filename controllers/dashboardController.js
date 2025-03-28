class dashboardController{

    DashBoard(req, res){
        res.render('dashboard', { username: req.user.username });
    }
    
}

module.exports = new dashboardController();