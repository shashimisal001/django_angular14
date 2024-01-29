import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class HelperService {
  dataShareEvents: EventEmitter<any> = new EventEmitter<any>;

  filterObjectArray(objArr: any, compareKey: string, compareValue: any) {
    let index = -1;
    objArr.forEach((value: any, key: any) => {
      if (value[compareKey] == compareValue) {
        index = key;
      }
    });
    return index;
  }

  moveToTop(top: number = 0) {
    window.scroll({
      top: top,
      left: 0,
      behavior: 'smooth'
    });
  }

  successMsg(msg: string, msgType: string="success"){
    this.dataShareEvents.emit({ 'isMsgOn': true, 'msg': msg, msgType: msgType })
  }

  errorMsg(msg: string, msgType: string="danger"){
    this.dataShareEvents.emit({ 'isMsgOn': true, 'msg': msg, msgType: msgType })
  }
}