import Watcher from './Watcher';
import fs from 'fs';
export class C {
    private x = 10;
    getX = () => this.x;
    setX = (newVal: number) => { this.x = newVal; }
}

export let x = new C();
export let y = { ...{ some: "value" } };
console.log(x,y);


// 打开一个文件监听器；
const watcher = new Watcher('./src/watch');
watcher.on('process',(file:string)=>{
    const watchFile = `./src/watch/${file}`;
    const processedFile = `./src/done/${file.toLowerCase()}`;
    fs.rename(watchFile, processedFile, err => {
        if (err) throw err;
    });
})
watcher.start();
