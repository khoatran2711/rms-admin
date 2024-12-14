import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-employee-upsert',
  templateUrl: './employee-upsert.component.html',
  styleUrls: ['./employee-upsert.component.scss'],
})
export class EmployeeUpsertComponent implements OnInit {
  //skeleton
  isLoading = true;
  showContent = false;
  selectedTab: string = 'editProfile'; // Set the default selected tab
  tabTitle: string = 'Edit Profile';
  subTitle: string = 'Set Up Your Personal Information';
  listItemClass: string =
    'flex items-center mb-3 px-5 py-3 rounded-[6px] bg-transparent text-light dark:text-white/60 font-normal [&.active]:text-primary [&.active]:bg-primary/10 duration-300 gap-[12px] cursor-pointer';
  // Function to handle tab selection
  selectTab(tab: string, title: string, subtitle: string) {
    this.selectedTab = tab;
    this.tabTitle = title;
    this.subTitle = subtitle;
  }
  date;
  employeeForm: FormGroup;
  changePWForm: FormGroup;
  avatarUrl: string = 'assets/images/avatars/thumbs.png';
  avatarCoverUrl: string = 'assets/images/profile-cover.png';
  selectedCountry: any;
  selectedLanguage: any;
  validateForm: FormGroup;
  employeeID: any;
  roleData = [];

  networkList = [
    {
      name: 'Facebook',
      icon: 'facebook',
      avatarColor: '#4267b1',
      avatarBg: 'rgba(66, 103, 177, 0.1)',
      status: true,
      link: 'https://facebook.com',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      avatarColor: '#fff',
      avatarBg:
        'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
      status: false,
      link: 'https://instagram.com',
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      avatarColor: '#1ca1f2',
      avatarBg: 'rgba(28, 161, 242, 0.1)',
      status: true,
      link: 'https://twitter.com',
    },
    {
      name: 'Dribbble',
      icon: 'dribbble',
      avatarColor: '#d8487e',
      avatarBg: 'rgba(216, 72, 126, 0.1)',
      status: false,
      link: 'https://dribbble.com',
    },
    {
      name: 'Github',
      icon: 'github',
      avatarColor: '#323131',
      avatarBg: 'rgba(50, 49, 49, 0.1)',
      status: true,
      link: 'https://github.com',
    },
    {
      name: 'Linkedin',
      icon: 'linkedin',
      avatarColor: '#0174af',
      avatarBg: 'rgba(1, 116, 175, 0.1)',
      status: true,
      link: 'https://linkedin.com',
    },
    {
      name: 'Dropbox',
      icon: 'dropbox',
      avatarColor: '#005ef7',
      avatarBg: 'rgba(0, 94, 247, 0.1)',
      status: false,
      link: 'https://dropbox.com',
    },
  ];
  listOfOption = [
    { label: 'United Stata', value: '1' },
    { label: 'United Kingdom', value: '2' },
    { label: 'France', value: '3' },
    { label: 'German', value: '4' },
  ];
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private notificationService: NotificationService,
    private message: NzMessageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.employeeID = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // Simulate loading time
    this.loadData();
    this.initData();
    this.fetchRoleData();
    // form
    this.changePWForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });

    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      this.avatarUrl = storedAvatar;
    }
    // Get the avatar and avatar cover from localStorage
    const storedAvatarCover = localStorage.getItem('avatarCover');
    if (storedAvatarCover) {
      this.avatarCoverUrl = storedAvatarCover;
    }
  }
  initData() {
    if (this.employeeID) {
      this.apiService.getEmployee(this.employeeID).subscribe((res) => {
        this.makeForm(res[0]);
        this.avatarUrl = res[0].avatar
          ? `http://localhost:8080${res[0].avatar}`
          : 'assets/images/avatars/thumbs.png';
        this.date = moment(res[0].dateOfBirth, 'DD/MM/YYYY', true).toDate();
      });
      return;
    }
    this.makeForm();
  }
  fetchRoleData() {
    this.apiService.listRole({}).subscribe((res) => {
      this.roleData = res;
    });
  }
  makeForm(d?) {
    this.employeeForm = this.fb.group({
      id: [d?.id],
      userName: [d?.userName, Validators.required],
      avatar: [d?.avatar],
      email: [d?.email, Validators.required],
      fullName: [d?.fullName, Validators.required],
      phoneNumber: [d?.phoneNumber, Validators.required],
      address: [d?.address, Validators.required],
      dateOfBirth: [d?.dateOfBirth, Validators.required],
      roleID: [d?.roleID || '2', Validators.required],
      password: ['admin123'],
    });
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  submitForm(): void {
    for (const i in this.changePWForm.controls) {
      this.changePWForm.controls[i].markAsDirty();
      this.changePWForm.controls[i].updateValueAndValidity();
    }
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  //avatar
  handleChange(info: { file: NzUploadFile }): void {
    let formdata = new FormData();
    formdata.append('file', info.file.originFileObj as any);
    this.apiService.uploadIMG(formdata).subscribe((res) => {
      this.employeeForm.get('avatar').setValue(res);
      this.avatarUrl = `http://localhost:8080${res}`;
    });
  }

  submitEmployeeForm() {
    // this.employeeForm.valid

    if (true) {
      let id = this.employeeID;
      let employeeData = this.employeeForm.value;
      this.modalService.confirm({
        nzTitle: 'Do you want to save the changes?',
        nzContent: 'When clicked the OK button, the changes will be saved',
        nzOnOk: () => {
          if (id) {
            this.apiService.updateEmployee(employeeData).subscribe((_) => {
              this.showContent = false;
              this.loadData();
              this.notificationService.createNotification({
                type: 'success',
                title: 'Success',
                message: 'Employee updated successfully',
                position: 'bottomRight',
              });
            });
            return;
          }

          this.apiService.createEmployee(employeeData).subscribe((_) => {
            this.showContent = false;
            this.loadData();
            this.employeeForm.reset();
            this.notificationService.createNotification({
              type: 'success',
              title: 'Success',
              message: 'Employee created successfully',
              position: 'bottomRight',
            });
          });
          return;
        },
      });
    }
  }
  goToEmployeeList() {
    this.router.navigate(['dashboard/employee']);
  }
  dateChange(e): void {
    const dateValue = format(e, 'dd/MM/yyyy');
    this.employeeForm.get('dateOfBirth').setValue(dateValue);
    return;
  }
  getRoleName() {
    const id = this.employeeForm.get('roleID').value;
    if (!id) return;
    const role = this.roleData.find((role) => role.id == id);
    return role?.name;
  }
}
