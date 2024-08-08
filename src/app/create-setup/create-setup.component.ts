import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  ExternalSystemConfig,
  PlannerType,
  Run,
  Setup,
  Trigger,
} from '../_services/types';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SetupService } from '../_services/setup.service';

@Component({
  selector: 'app-create-setup',
  standalone: true,
  imports: [
    //ng modules
    CommonModule,
    ReactiveFormsModule,
    //material modules
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './create-setup.component.html',
  styleUrl: './create-setup.component.scss',
})
export class CreateSetupComponent {
  formGroup: FormGroup;

  plannerTypes = [PlannerType.NonSpecific, PlannerType.Specific];
  configTypes = [ExternalSystemConfig.ConfigA, ExternalSystemConfig.ConfigB];

  get funds() {
    return this.formGroup.get('funds') as FormArray;
  }

  get runs() {
    return this.formGroup.get('runs') as FormArray;
  }

  get reports() {
    return this.formGroup.get('reports') as FormArray;
  }

  get sources() {
    return this.formGroup.get('sources') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private setupService: SetupService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      plannerType: PlannerType.NonSpecific,
      externalSystemConfig: [ExternalSystemConfig.ConfigA],
      triggers: this.formBuilder.group({
        runs: [true],
        sources: [false],
        reports: [false],
      }),
      funds: this.formBuilder.array([]),
      sources: this.formBuilder.array([]),
      runs: this.formBuilder.array([]),
      reports: this.formBuilder.array([]),
    });
  }

  async createSetup() {
    console.log(this.formGroup.valid);

    const {
      name,
      description,
      triggers,
      plannerType,
      externalSystemConfig,
      funds,
      sources,
      runs,
      reports,
    } = this.formGroup.value;

    const payload: Partial<Setup> = {
      name: name,
      description: description,
      plannerType: plannerType,
      externalSystemConfig: externalSystemConfig,
      triggers: [
        ...(triggers.runs ? [Trigger.Runs] : []),
        ...(triggers.sources ? [Trigger.Sources] : []),
        ...(triggers.reports ? [Trigger.Reports] : []),
      ],
      runs: (runs as string[]).map((name) => ({ name })) as Run[],
      funds: funds,
      sources: (runs as string[]).map((name) => ({ name })) as Run[],
      reports: [],
    };

    this.setupService.create(payload).subscribe(() => {
      // if successfull navigate to home
      this.router.navigate(['/']);
    });
  }

  addFund() {
    this.funds.push(
      this.formBuilder.group({
        name: [''],
        alias: [''],
      })
    );
  }

  addRun() {
    this.runs.push(this.formBuilder.control(['']));
  }
  addSources() {
    this.sources.push(this.formBuilder.control(['']));
  }

  addReport() {
    this.reports.push(
      this.formBuilder.group({
        type: [''],
        name: [''],
      })
    );
  }
}
