// import { ImageSourcePropType } from "react-naitve";

export const colors = ['#293694','#4758DE','#0518AB','#1C41FF','#00A8FF'];

export class CardInfo{
  constructor(props){
    this.accId = props.accId
    this.cardType = props.cardType // '저축예금 || 정기적금'
    this.ntnCode = props.ntnCode;
    this.accountnum = props.accountnum;
    this.balance = props.balance;
  }
}


