console.log("Frame's page found.");

let page;

exports.onNavigatingTo = function(args) {
  page = args.object;
  
  console.log("Frame's page navigated successfully.");
};