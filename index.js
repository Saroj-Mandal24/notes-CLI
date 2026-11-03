//Experiment 1
// import fs from "fs/promises";

// await fs.writeFile("hello.txt","Hello Backend")
// const text = await fs.readFile("hello.txt","utf-8");
// console.log(text)

//Experiment 2
// import path from "path"
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename);

// console.log(__filename);
// console.log(__dirname);
// console.log(path.join(__dirname,"notes.json"));

//Task 3
import "dotenv/config";
import fs from "fs/promises"
import path from 'path'
import { fileURLToPath  } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname,"notes.json");

const addnote = async (text) => {
    try {
        
        const data = await fs.readFile(filePath,"utf-8")

        const notes = JSON.parse(data)

        notes.push({id: Date.now(),text});

        await fs.writeFile(filePath,JSON.stringify(notes,null,2))

        console.log("Notes Added")
    } catch (err) {
        console.log("Error : ",err.message);
    }
}

//await addnote("Learn fs")
//await addnote("Lear path")
//Task 4
const listNotes = async () => {
    try {
        const data = await fs.readFile(filePath,"utf-8")

    const notes = JSON.parse(data)
    
    if(notes.length === 0){
        console.log("No Notes yet");
        return;
    }
    notes.forEach((note) => {
        console.log(note.id,"-",note.text);
        
    })
    } catch (error) {
        console.log("Error: ",error.message);
        
    }
}

//await listNotes()

const [command, ...rest] = process.argv.slice(2);

if (command === "add") await addnote(rest.join(" "));
if (command === "list") await listNotes();



