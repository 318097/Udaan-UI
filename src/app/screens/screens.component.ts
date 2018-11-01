import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.scss']
})
export class ScreensComponent implements OnInit {
  screenList: any = [];
  currentScreen: any = {};
  selectedSeats: any = [];
  selectedIndex = 0;
  isLoading = true;
  constructor(
    private sharedService: SharedService,
    private utility: UtilityService
  ) { }

  ngOnInit() {
    this.getAllScreens();
  }

  getAllScreens() {
    this.currentScreen = {};
    this.selectedSeats = [];
    this.sharedService.getScreenList()
      .subscribe((response: any) => {
        this.screenList = response.data;
        // console.log(this.screenList);
        this.selectScreen();
      });
  }

  selectScreen(index: number = 0) {
    let availableSeats = 0;
    const screen = this.screenList[index];
    console.log('screen before parsing ::', screen);
    const seating = [];
    for (const row in screen.seatInfo) {
      if (screen.seatInfo.hasOwnProperty(row)) {
        availableSeats += screen.seatInfo[row]['available'].length;
        const rows = [];
        const currentRow = screen.seatInfo[row];
        for (let i = 0; i < currentRow.numberOfSeats; i++) {
          rows.push({
            'seatNo': row + i,
            'available': currentRow.available.includes(i),
            'reserved': currentRow.reserved.includes(i),
            'isAisle': currentRow.aisleSeats.includes(i)
          });
        }
        seating.push(rows);
      }
    }
    console.log('screen after parsing ::', seating);
    setTimeout(() => this.isLoading = false, 500);
    this.currentScreen = { name: screen.name, seating, availableSeats };
  }

  selectSeat(seat: any, rowIndex: any, seatIndex) {
    if (seat.available) {
      if (this.selectedSeats.includes(seat.seatNo)) {
        this.selectedSeats.splice(this.selectedSeats.indexOf(seat.seatNo), 1);
        this.currentScreen['seating'][rowIndex][seatIndex]['selected'] = false;
      } else {
        this.selectedSeats.push(seat.seatNo);
        this.currentScreen['seating'][rowIndex][seatIndex]['selected'] = true;
      }
    }
  }

  bookSeats() {
    const screenName = this.currentScreen.name;
    const data = {};
    const seats = {};
    this.selectedSeats.forEach((seat: string) => {
      const [row, no] = seat.split('');
      if (!seats[row]) {
        seats[row] = [];
      }
      seats[row].push(Number(no));
    });
    data['seats'] = seats;
    console.log(data);
    this.sharedService.bookSeats(screenName, data)
      .subscribe((response: any) => {
        this.utility.openSnackBar(response.message);
        this.getAllScreens();
      });
  }
}
