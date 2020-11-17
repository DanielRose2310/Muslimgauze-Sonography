const fs=require('fs')



fs.readFile("downloaded.json", function (err, data) {
    if (err) throw err;
let parsed = JSON.parse(data);
let rel={
    "albumtitle": "",
    "albumyear": 0,
    "albumformat": "",
    "albumcatalogue": ""
  }
parsed.map(item=>{
    
    if (item.releases.length===1){
        item.releases.push(rel)
    }
    if (item.releases.length===2){
        item.releases.push(rel)
    }
    console.log(item.releases.length)


})

fs.writeFile('edited.json', JSON.stringify(parsed), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});