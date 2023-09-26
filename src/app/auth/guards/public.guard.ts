import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private checkAuthStatus(): boolean | Observable<boolean> {

    // revisamos  que si este autenticado y si cierra sesion lo mandamos al login y protegemos nuestras rutas
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated  => console.log('authenticated', isAuthenticated)),
        tap( isAuthenticated => {
          if( isAuthenticated ){
            this.router.navigate(['./'])
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      )
  }


  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

    return this.checkAuthStatus();

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |  Observable<boolean>  {

    return this.checkAuthStatus();
  
  }
  
}
