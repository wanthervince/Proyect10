import { Component, OnInit } from '@angular/core';
import { creditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent implements OnInit {
  cards: creditCard[] = [];

  constructor(
    private cardService: CreditCardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this.cardService.getCreditCard().subscribe((res) => {
      this.cards = [];
      res.forEach((e: any) => {
        this.cards.push({
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        });
      });
    });
  }

  deleteCreditCard(id: any) {
    this.cardService.deleteCreditCard(id).then(() => {
      this.toastr.error('Card Detele Success', 'OK!');
    });
  }
  editCreditCard(card: creditCard) {
    this.cardService.addCreditCardEdit(card);
  }
}
