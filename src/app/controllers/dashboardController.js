class dashboardController{

    DashBoard(req, res){
        res.render('dashboard', { title: 'Dashboard' });
    }
    
}

module.exports = new dashboardController();