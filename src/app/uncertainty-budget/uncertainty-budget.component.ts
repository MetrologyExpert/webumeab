import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeasurementUnitPipe } from '../measurement-unit.pipe';

@Component({
  selector: 'uncertainty-budget',
  templateUrl: './uncertainty-budget.component.html',
  styleUrls: ['./uncertainty-budget.component.css']
})
export class UncertaintyBudgetComponent implements OnInit {
  uncertaintyBudgetForm: FormGroup;
  totalUncertainty: number = 0;
  myFormValueChanges$;

  constructor(
    private formBuilder: FormBuilder,
    private measurementUnit: MeasurementUnitPipe
  ) { }

  /**
   * Form initialization
   */
  ngOnInit () {
    // create form with validators and dynamic rows array
    this.uncertaintyBudgetForm = this.formBuilder.group({
      description: ['', [Validators.required,Validators.maxLength(25)]],
      contributions: this.formBuilder.array([
         // load first row at start
         this.getContribution()
      ])
    });
    // initialize stream on contributiona
    this.myFormValueChanges$ = this.uncertaintyBudgetForm.controls['contributions'].valueChanges;
    // subscribe to the stream so listen to changes on units
    this.myFormValueChanges$.subscribe(contributions => this.updateTotalUncertainty(contributions));

  }

  /**
   * unsubscribe listener
   */
  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }

  /**
   * Save form data
   */
  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
    alert('Form data are: ' + JSON.stringify(model));
  }

  /**
   * Create form unit
   */
  private getContribution() {
    const numberPatern = '^[0-9.,]+$';
    return this.formBuilder.group({
      title: ['', Validators.required],
      errorValue: ['', [Validators.required, Validators.pattern(numberPatern)]],
      divisor: ['', [Validators.required, Validators.pattern(numberPatern)]],
      standardUncertainty: [{value: '', disabled: true}],
      sc:['', [Validators.required] ],
      stdUnc:[{value: '', disabled: true}]
    });
  }

  /**
   * Add new contribution row into form
   */
  addContribution() {
    const control = <FormArray>this.uncertaintyBudgetForm.controls['contributions'];
    control.push(this.getContribution());
  }

  /**
   * Remove contributions row from form on click delete button
   */
  removeContribution(i: number) {
    const control = <FormArray>this.uncertaintyBudgetForm.controls['contributions'];
    control.removeAt(i);
  }

  /**
   * This is one of the way how clear units fields.
   */
  clearAllContributions() {
    const control = <FormArray>this.uncertaintyBudgetForm.controls['contributions'];
    while(control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    control.push(this.getContribution());
  }

  /**
   * This is example how patch units array. Before patch you have to create 
   * same number of FormArray controls. As we have already one control created
   * by default we start from i = 1 not 0. This way it could be implemented in 
   * ngOnInit in case of update just you have to prepare FormArray and then patch
   * whole form object not just units.
   */
  addSomeUnitsFromArrayExample() {
    const contributionsArray = [
      {title: 'test  1', errorValue: 2, divisor: 22.44, sc:1},
      {title: 'test  2', errorValue: 1, divisor: 4, sc:2},
      {title: 'test  3', errorValue: 44, divisor: 1.50, sc:3}
    ]
    const control = <FormArray>this.uncertaintyBudgetForm.controls['contributions'];
    for (let i = 1; i < contributionsArray.length; i++) {
      control.push(this.getContribution());
    }
    this.uncertaintyBudgetForm.patchValue({contributions: contributionsArray});
  }

  /**
   * Update prices as soon as something changed on units group
   */
  private updateTotalUncertainty(contributions: any) {
    // get our contributions group controll
    const control = <FormArray>this.uncertaintyBudgetForm.controls['contributions'];
    // before recount total price need to be reset. 
    this.totalUncertainty = 0;
    for (let i in contributions) {

      let standardUncertainty = (contributions[i].errorValue/contributions[i].divisor);
      let stdUnc = (standardUncertainty * contributions[i].sc);

      // now format total uncertaity with angular custom pipe
      let totalUncertaintyFormatted = this.measurementUnit.transform(standardUncertainty, 'mm');
      // update total sum field on unit and do not emit event myFormValueChanges$ in this case on units
      control.at(+i).get('standardUncertainty').setValue(totalUncertaintyFormatted, {onlySelf: true, emitEvent: false});
      // update total price for all units

      // now format total price with angular currency pipe
      let totalStdUncFormatted = this.measurementUnit.transform(stdUnc, 'mm');
      // update total sum field on unit and do not emit event myFormValueChanges$ in this case on units
      control.at(+i).get('stdUnc').setValue(totalStdUncFormatted, {onlySelf: true, emitEvent: false});
      // update total price for all units     

      this.totalUncertainty += Math.sqrt(stdUnc);
    }
  }

  get loopContributions(){
    return  (<FormArray>this.uncertaintyBudgetForm.controls.contributions).controls;
  }

}
