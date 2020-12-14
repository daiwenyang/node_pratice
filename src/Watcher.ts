import fs from "fs";
import events from 'events'

export default class Watcher extends events.EventEmitter{
    private watchDir:string;
    constructor(watchDir:string){
        super();
        this.watchDir = watchDir;
    }

    watch(){
        fs.readdir(this.watchDir,(err,files)=>{
            if(err) throw err;
            for(let file of files){
                this.emit("process",file);
            }
        })
    }

    start(){
        fs.watchFile(this.watchDir,()=>{
            this.watch();
        })
    }
}
