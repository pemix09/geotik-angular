import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {}

    public registerIcons(): void {
      this.matIconRegistry.addSvgIcon('deleteIcon', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/delete.svg'));
      this.matIconRegistry.addSvgIcon('tickIcon', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/tick.svg'));
    }
}
