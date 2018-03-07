const fs = require('fs-extra');

// Copy GOV.UK template assets over to public
fs.copy('./node_modules/govuk_template_ejs/assets', './public', function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Build completed successfully.");
  }
});
