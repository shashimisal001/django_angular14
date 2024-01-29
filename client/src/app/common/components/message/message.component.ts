import { Component, EventEmitter, Output } from "@angular/core";
import { HelperService } from "../../services/helper.service";

@Component({
    selector: "message-component",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.component.scss"]
})

export class MessageComponent {
    msgObjects: any = [];
    timeOut: number = 3000;

    @Output()
    msgCame: EventEmitter<boolean> = new EventEmitter<boolean>;

    constructor(private helperService: HelperService){}

    ngOnInit(){
        this.listenToMessageEvents();
    }

    pushMsgInQueue(data: any){
        let msgObj = { 
            msg: data["msg"], 
            isMsgOn: ('isMsgOn' in data) ? data['isMsgOn'] : true,
            msgType: ('msgType' in data) ? data['msgType'] : "success"
        }
        this.msgObjects.push(msgObj);
    }

    hideMsgAfterTimeOut(){
        let msgIndex: number = this.msgObjects.length-1;
        setTimeout(() => { 
            this.msgObjects[msgIndex].isMsgOn = false; 
        }, this.timeOut);
    }

    cleanHiddenMsgs(){
        let tempMsgObjects = this.msgObjects.filter((item: any) => item.isMsgOn !== false);
        if(tempMsgObjects.length === 0) {
            this.msgObjects = [];
        }
    }

    listenToMessageEvents(){
        this.helperService.dataShareEvents.subscribe({
            next: (data: any)=>{
                this.cleanHiddenMsgs();
                if(data["isMsgOn"]){
                    this.pushMsgInQueue(data);
                    this.hideMsgAfterTimeOut();
                    this.msgCame.emit(true);
                }
            }
        });
    }
}