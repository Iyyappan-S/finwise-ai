const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.finwisecluster.wzjmfjj.mongodb.net",
  (err, records) => {
    if (err) {
      console.log("DNS ERROR");
      console.log(err);
    } else {
      console.log("SUCCESS");
      console.log(records);
    }
  }
);