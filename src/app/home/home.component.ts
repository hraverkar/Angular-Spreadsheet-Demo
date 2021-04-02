import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public fileToUpload: File;
  public excelData: any[] = [];
  public htmlRender: any;
  public excelData1: any[] = [];

  constructor() {
  }

  public ngOnInit(): void {}

  public onFileChange(event: any): void {
    const target: DataTransfer = event.target as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Can not use multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      console.table(data);
    };
  }


  public handleFileInput(event: any): void {
    const target: DataTransfer = event.target as DataTransfer;
    console.log(target.files.length);
    for (const file of target.files) {
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e: any) => {
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        this.htmlRender = XLSX.utils.sheet_to_html(ws);
        console.table(data);
        this.excelData.push(data);
      };
    }
  }
}
