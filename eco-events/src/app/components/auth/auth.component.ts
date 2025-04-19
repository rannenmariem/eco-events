import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isRegisterModalOpen = false;

  constructor(private fb: FormBuilder, private router: Router) {}


  ngOnInit() {
    // Formulaire de connexion
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Formulaire d'inscription
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      birthdate: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      job: ['', Validators.required],
      profileImage: [null],
    });
  }

  // Inscription
  onRegister() {
    if (this.registerForm.valid) {
      const { password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }

      // Message de succès et fermeture de la modale
      console.log('Inscription réussie :', this.registerForm.value);
      alert('Inscription réussie !');
      this.closeRegisterModal();
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
  login() {
    if (this.loginForm.invalid) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Login simulé
    if (email === 'mariem@gmail.com' && password === 'password') {
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/home']);
    } else {
      alert('Identifiants incorrects.');
    }
  }

  // Gestion du fichier
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ profileImage: file });
    }
  }

  openRegisterModal() {
    this.isRegisterModalOpen = true;
    this.registerForm.reset(); // Réinitialise les champs lors de la fermeture

  }

  closeRegisterModal() {
    this.isRegisterModalOpen = false;
    this.registerForm.reset(); // Réinitialise les champs lors de la fermeture

  }
  continueWithGoogle() {
    alert('Redirection via Google OAuth...');
    this.router.navigate(['/home']); // direction vers home
  }

  continueWithFacebook() {
    alert('Redirection via Facebook OAuth...');
    this.router.navigate(['/home']); // direction vers home
  }
}
