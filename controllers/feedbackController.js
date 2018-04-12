const converter = require('json-2-csv');

const Feedback = require('../models').Feedback;

let controller = {
  downloadCsv: (req, res)=>{

    let feedbacks = Feedback.findAll({ plain: true })
      .then(function(results){

        converter.json2csv([results.dataValues], function(err, csv){
          if(err) res.send(err);
          // Set the correct HTTP headers for a CSV file
          res.setHeader('Content-disposition', 'attachment; filename=feedback.csv');
          res.set('Content-Type', 'text/csv');
          res.status(200).send(csv);
        })
      })
      .catch(err => console.log(err))
  },


}
module.exports = controller;
