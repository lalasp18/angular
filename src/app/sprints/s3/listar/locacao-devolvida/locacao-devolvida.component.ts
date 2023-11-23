import { Component } from '@angular/core';

@Component({
  selector: 'app-locacao-devolvida',
  templateUrl: './locacao-devolvida.component.html',
  styleUrls: ['./locacao-devolvida.component.scss']
})
export class LocacaoDevolvidaComponent { //implements OnInit, OnDestroy {
  // @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  // itemData: Item[] = [];
  // unsubscribe$!: Subscription;
  // itemParaDeletarId: number = -1;

  // staticAlertClosed = false;
  // alertMessage: string | undefined;
  // alertType: string | undefined;

  // constructor(
  //   private alertServ: AlertService,
  //   private itemService: ItemService,
  //   private router: Router
  // ) { }

  // ngOnInit() {
  //   this.unsubscribe$ = this.itemService.listarItem()
  //     .subscribe({
  //       next: (itens: any) => {
  //         const data = itens;
  //         this.itemData = data.sort((a: any, b: any) => (a.numSerie < b.numSerie) ? -1 : 1);
  //       },
  //       error: (err: any) => {
  //         this.alertServ.warning('Dados não encontrados.')
  //       }
  //     });

  //   this.alertServ.getMessage().subscribe(message => {
  //     if (message) {
  //       this.alertMessage = message.text;
  //       this.alertType = message.type;
  //       this.alertServ.getMessage().pipe(debounceTime(5000)).subscribe(() => {
  //         if (this.selfClosingAlert) {
  //           this.selfClosingAlert.close();
  //         }
  //       });
  //     } else {
  //       this.alertMessage = undefined;
  //       this.alertType = undefined;
  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   this.unsubscribe$.unsubscribe();
  // }

  // close() {
  //   this.alertMessage = '';
  // }

  // editarID(id: number) {
  //   this.router.navigate(['api/item/listar', id]);
  // }

  // definirIdParaDeletar(id: number) {
  //   this.itemParaDeletarId = id;
  // }

  // limparIdParaDeletar() {
  //   this.itemParaDeletarId = -1;
  // }

  // deletarID(id: number) {
  //   this.itemService.deletarItem(id).subscribe(data => {
  //     this.ngOnInit();
  //   });
  // }
}
