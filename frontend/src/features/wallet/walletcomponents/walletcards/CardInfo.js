// import { ImageSourcePropType } from "react-naitve";

const colors = ['#4758DE','#00A8FF','#0518AB','#293694','#8FD9FF','#1C41FF'];


export class CardInfo{
  constructor(props){
    this.cardType = props.cardType // 'Saving || I/O'
    this.ntnCode = props.ntnCode;
    this.nation = props.nation;
    this.accountnum = props.accountnum;
    this.balance = props.balance;
  }
}


