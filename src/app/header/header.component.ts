import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(private authService: AuthService) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
  }
  @Output() featuredSelected = new EventEmitter<string>();
  collapsed = true;

  // onSelect(feature:string){
  // this.featuredSelected.emit(feature);
  // }

  onLogout() {
    this.authService.logout();
  }
}
