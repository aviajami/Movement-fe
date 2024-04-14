import { Component, Input } from '@angular/core';
import { User } from '../services/user.model';
import { UserService } from '../services/users.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {

  @Input() user: User;
  @Input() index: number;

  parameter: string;

  constructor(private userService: UserService) {
  }
}
