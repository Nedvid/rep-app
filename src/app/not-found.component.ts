import {
  Component,
  OnInit,
  Optional,
  PLATFORM_ID,
  APP_ID,
  Inject
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { RouterExtService } from './routerExt.service';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/browser';

interface PartialResponse {
  status(code: number): this;
}

@Component({
  selector: 'app-not-found',
  templateUrl: 'not-found.component.html'
})
export class NotFoundComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
    @Optional() @Inject(RESPONSE) private response: PartialResponse,
    private routerExtService: RouterExtService,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId) && this.response) {
      this.response.status(200);
    }

    const routerLog: RouterLog = {
      current: this.router.url,
      previous: this.routerExtService.getPreviousUrl()
    };

    const source =
      routerLog.current === '/notfound'
        ? routerLog.previous
        : routerLog.current;

    Sentry.captureMessage(
      'User navigated to "NotFound" page from:' + source,
      Sentry.Severity.Info
    );
  }
}

export interface RouterLog {
  current: string;
  previous: string;
}
