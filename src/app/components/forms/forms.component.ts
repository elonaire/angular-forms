import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

interface DynamicForm {
  formName: string;
  forms: NestedForm[];
}

interface NestedForm {
  formName: string;
  type: string;
  formFields: FormField[];
}

interface FormField {
  controlType: string;
  type: string;
  controlName: string;
  placeholder: string;
  required: boolean;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  generatedForm: FormGroup = this.fb.group({
    forms: this.fb.array([]),
  });
  formSchema: DynamicForm = {
    formName: 'Main Form',
    forms: [
      {
        formName: 'Form One',
        type: 'array',
        formFields: [
          {
            controlType: 'input',
            type: 'text',
            controlName: 'input1',
            placeholder: 'input one',
            required: true,
          },
        ],
      },
      {
        formName: 'Form Two',
        type: 'single',
        formFields: [
          {
            controlType: 'input',
            type: 'text',
            controlName: 'input1',
            placeholder: 'input one',
            required: true,
          },
          {
            controlType: 'input',
            type: 'text',
            controlName: 'input2',
            placeholder: 'input two',
            required: true,
          },
          {
            controlType: 'input',
            type: 'text',
            controlName: 'input3',
            placeholder: 'input three',
            required: false,
          },
        ],
      },
    ],
  };
  abstractedForms: any;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    for (let i = 0; i < this.formSchema.forms.length; i++) {
      let fields = {};
      let formGroup: FormGroup;
      const form = this.formSchema.forms[i];
      if (form.type === 'single') {
        for (let j = 0; j < form.formFields.length; j++) {
          const field = form.formFields[j];
          field.required ? fields[field.controlName] = ['', Validators.required] : fields[field.controlName] = [''];
        }
        console.log(fields);
        formGroup = this.fb.group(fields);
        (this.generatedForm.get('forms') as FormArray).push(formGroup);
      } else {
        for (let j = 0; j < form.formFields.length; j++) {
          const field = form.formFields[j];
          field.required ? fields[field.controlName] = ['', Validators.required] : fields[field.controlName] = [''];
        }
        console.log(fields);
        formGroup = this.fb.group(fields);
        let formArray = this.fb.array([formGroup]);
        (this.generatedForm.get('forms') as FormArray).push(formArray);
      }
    }

    console.log(this.generatedForm.value);
  }

  get formsArray() {
    return <FormArray>this.generatedForm.get('forms');
  }
}
