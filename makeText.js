/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");



function generate(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path){
    fs.readFile(path, 'utf8', function cb(err, data){
        if(err){
            console.error("error");
            process.exit(1);
        } else{
            generate(data);
        }
        
    });
}

async function urltext(url){
    let res;
    try{
        res = await axios.get(url);
    }catch(err){
        console.error("error");
        process.exit(1);

    }
    generate(res.data);
} 
let [meth,path] = process.argv.slice(2);
if(meth === 'url'){
    urltext(path);
}else if (meth === "file"){
    makeText(path);
}else{
    console.error("error");
    process.exit(1);
}