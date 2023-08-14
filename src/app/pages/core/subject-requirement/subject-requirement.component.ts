import {Component} from '@angular/core';
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-subject-requirement',
  templateUrl: './subject-requirement.component.html',
  styleUrls: ['./subject-requirement.component.scss']
})
export class SubjectRequirementComponent {
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
}
