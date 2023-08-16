import {Component, OnInit} from '@angular/core';
import {PrimeIcons, TreeNode} from "primeng/api";
import {SubjectsHttpService} from "@services/core";
import {SubjectModel} from "@models/core";

@Component({
  selector: 'app-subject-requirement',
  templateUrl: './subject-requirement.component.html',
  styleUrls: ['./subject-requirement.component.scss']
})
export class SubjectRequirementComponent implements OnInit {
  selectedNodes: TreeNode[] = [];
  data: TreeNode[] = [
    {
      expanded: true,
      type: 'person',
      data: {
        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        name: 'Amy Elsner',
        title: 'CEO'
      },
      children: [
        {
          expanded: true,
          type: 'person',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
            name: 'Anna Fali',
            title: 'CMO'
          },
          children: [
            {
              label: 'Sales'
            },
            {
              label: 'Marketing'
            }
          ]
        },
        {
          expanded: true,
          type: 'person',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
            name: 'Stephen Shaw',
            title: 'CTO'
          },
          children: [
            {
              label: 'Development'
            },
            {
              label: 'UI/UX Design'
            }
          ]
        }
      ]
    }
  ];
  protected subjects: SubjectModel[] = [];

  constructor(private subjectsHttpService: SubjectsHttpService) {
  }

  ngOnInit(): void {
    this.getSubjectsByCurriculum();
  }

  getSubjectsByCurriculum() {
    this.subjectsHttpService.findByCurriculum('288c72d4-4a95-4357-9e22-a400a350c9e3').subscribe((subjects: SubjectModel[]) => {
      this.subjects = subjects;
    });
  }

  getSubjectsByEnrollment() {

  }

  protected readonly PrimeIcons = PrimeIcons;
}
