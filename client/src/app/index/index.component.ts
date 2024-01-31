import { Component } from "@angular/core";

@Component({
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"]
})

export class IndexComponet {
    images: any = [
        { path: "/assets/img/slides/image1.png" },
        { path: "/assets/img/slides/image2.jpg" }
    ]
    constructor(){
        
    }
}