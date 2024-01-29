import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { CartService } from '../common/services/cart.service';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {
  pageMeta: any = {};
  cart: string | null = "[]"
  constructor(private route: ActivatedRoute, 
    private router: Router,
    public cartService: CartService,
    public authService: AuthService){}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.route)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
      mergeMap((route: ActivatedRoute) => route.data)
    ).subscribe((event: {[name: string]: any}) => {
      this.pageMeta = event;
    });
  }
  
  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  msgCame(args: boolean){
    
  }
}
