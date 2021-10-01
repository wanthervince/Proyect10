import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { creditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent implements OnInit {
  form: FormGroup;
  editCreate: string = 'add credit card';
  id: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cardService: CreditCardService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nrocard: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      fexpired: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.cardService.getCreditCardEdit().subscribe((res) => {
      this.editCreate = 'edit Credit Card';
      this.id = res.id;
      this.form.patchValue({
        name: res.name,
        nrocard: res.nrocard,
        fexpired: res.fexpired,
        cvv: res.cvv,
      });
      console.log(res);
    });
  }
  createCard() {
    if (this.id === undefined) {
      const card: creditCard = {
        name: this.form.value.name,
        nrocard: this.form.value.nrocard,
        fexpired: this.form.value.fexpired,
        cvv: this.form.value.cvv,
        fcreate: new Date(),
        fupdate: new Date(),
      };
      this.form.reset();

      this.cardService.setCreditCard(card).then(() => {
        this.toastr.success('Add Credit Card Success', 'OK!');
      });
    } else {
      const card: any = {
        name: this.form.value.name,
        nrocard: this.form.value.nrocard,
        fexpired: this.form.value.fexpired,
        cvv: this.form.value.cvv,
        fupdate: new Date(),
      };
      this.editCreate = 'add credit card';
      this.form.reset();
      this.cardService.updateCreditCard(this.id, card).then(() => {
        this.toastr.info('Update Credit Card Success', 'OK!');
      });
    }
  }
}
