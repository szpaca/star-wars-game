import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private readonly snackBar: MatSnackBar) {
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          this.openSnackBar(`There is an error on our side. Try again later.`);
          return throwError(() => new Error(`${error}`));
        })
      );
  }
}
