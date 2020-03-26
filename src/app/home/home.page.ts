import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'firebase/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage
{
  valor: string;
  contador: number;
  boton: string;
  todo: any;
  item: Observable<any>;
  itemRef: AngularFireObject<any>;
  constructor(db: AngularFireDatabase)
  {
    this.itemRef = db.object('Michell');
    this.item = this.itemRef.valueChanges();
    this.itemRef.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      this.todo = action.payload.val();
      this.valor = this.todo.Valor;
      this.boton = this.todo.Boton;
      this.contador = this.todo.Contador;
    });
  }

  update() {
    if (this.valor === 'ON' ) {
      this.itemRef.update({ Valor: 'OFF' });
    } else {
      this.itemRef.update({ Valor: 'ON' });
    }
  }
  update1(){
    if (this.boton === '1' ) {
      this.itemRef.update({ Boton: '0' });
    } else {
      this.itemRef.update({ Boton: '1' });
    }
  }
}
