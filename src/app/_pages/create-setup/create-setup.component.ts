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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  ExternalSystemConfig,
  PlannerType,
  Run,
  Setup,
  Trigger,
} from '../../_services/types';
import { SetupService } from '../../_services/setup.service';
import { FundService } from '../../_services/fund.service';
import { SourceService } from '../../_services/source.service';
import { ReportTypeService } from '../../_services/report-type.service';
import { ReportService } from '../../_services/report.service';
import { RunService } from '../../_services/run.service';

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
    MatAutocompleteModule,
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
    public setupService: SetupService,
    public fundService: FundService,
    public reportTypeService: ReportTypeService,
    public reportService: ReportService,
    public runService: RunService,
    public sourceService: SourceService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
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

    this.fundService.loadData({ pageSize: 50 });
    this.reportTypeService.loadData({ pageSize: 50 });
    this.reportService.loadData({ pageSize: 1000 });
    this.runService.loadData({ pageSize: 50 });
    this.sourceService.loadData({ pageSize: 50 });
  }

  async createSetup() {
    // skip form validity check for now.

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
      runs: runs,
      funds: funds,
      sources: sources,
      reports: reports,
    };

    console.log(payload);

    this.setupService.create(payload).subscribe(() => {
      // if successfull navigate to home
      this.router.navigate(['/']);
    });
  }

  log(obj: any) {
    console.log(obj);
  }

  addFund() {
    this.funds.push(this.formBuilder.control(['']));
  }

  addRun() {
    this.runs.push(this.formBuilder.control(['']));
  }
  addSource() {
    this.sources.push(this.formBuilder.control(['']));
  }

  addReport() {
    this.reports.push(this.formBuilder.control(['']));
  }
}
