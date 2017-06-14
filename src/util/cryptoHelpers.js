module.exports = {
  toHex: (s) => {
   var hex = '';
   for(var i=0;i<s.length;i++) { hex += ''+s.charCodeAt(i).toString(16); }
    var finalhex = '0x' + hex
   return finalhex;
  }
}