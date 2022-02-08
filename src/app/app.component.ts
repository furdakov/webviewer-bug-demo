import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import WebViewer, { Core, UI, WebViewerInstance } from '@pdftron/webviewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('webViewerRef', { static: true }) webViewerRef: ElementRef<HTMLDivElement>;

  public title = 'webviewer-bug-demo';

  private viewerInstance: WebViewerInstance;
  private documentUrl = 'http://localhost:4200/assets/A17_FlightPlan.pdf';

  public async ngOnInit(): Promise<void> {
    this.viewerInstance = await WebViewer({
        path: './assets/pdftron/',
      },
      this.webViewerRef.nativeElement
    );

    this.listenToDocumentLoad();
    this.ui.loadDocument(this.documentUrl);
  }

  private listenToDocumentLoad(): void {
    this.documentViewer.addEventListener('documentLoaded', () => {
      this.ui.setFitMode(this.ui.FitMode.FitWidth);
      console.log('[FitMode] on document load: ', this.fitMode);

      this.wait(1000).then(() => {
        console.log('[FitMode] after delay: ', this.fitMode);
      });
    });
  }

  private get ui(): typeof UI {
    return this.viewerInstance.UI;
  }

  private get documentViewer(): Core.DocumentViewer {
    return this.viewerInstance.Core.documentViewer;
  }

  private get fitMode(): string {
    return this.ui.getFitMode();
  }

  private wait(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
