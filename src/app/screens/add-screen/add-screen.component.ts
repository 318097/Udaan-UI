import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/utility.service';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.scss']
})
export class AddScreenComponent implements OnInit {
  screenInfo: any = {
    name: '',
    seatInfo: []
  };
  test: any = '';
  constructor(
    private sharedService: SharedService,
    private utility: UtilityService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.addNewRow();
  }

  addNewRow() {
    this.screenInfo.seatInfo.push({
      'rowName': '',
      'noOfSeats': 0,
      'aisleSeats': '',
      'dropdownList': []
    });
  }
  updateDropdownList(value: any, index: number) {
    console.log(value, index);
    this.screenInfo.seatInfo[index]['dropdownList'] = new Array(Number(value)).fill(0);
  }

  addScreen() {
    const data = {
      name: this.screenInfo.name
    };
    const obj = {};
    this.screenInfo.seatInfo.forEach((el: any) => {
      obj[el.rowName] = {
        numberOfSeats: el.noOfSeats,
        aisleSeats: el.aisleSeats
      };
    });
    data['seatInfo'] = obj;
    console.log(data);
    this.sharedService.addScreen(data)
      .subscribe((response) => {
        this.utility.openSnackBar(response.message).subscribe(() => this.router.navigate(['screens']));

      });
  }
}
