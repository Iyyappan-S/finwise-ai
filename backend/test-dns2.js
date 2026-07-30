const dns = require("dns");

dns.lookup("google.com", (err, address) => {
  if (err) {
    console.error(err);
  } else {
    console.log(address);
  }
});