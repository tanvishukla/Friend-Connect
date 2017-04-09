
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('facebooklogin', { title: 'Express' });
};