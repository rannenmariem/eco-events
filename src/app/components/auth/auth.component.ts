import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  // Connexion
  onLogin() {
    if (this.loginForm.valid) {
      console.log('Connexion réussie :', this.loginForm.value);
      this.router.navigate(['/home']);
    } else {
      alert('Veuillez remplir tous les champs.');
    }
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


  // Gestion du fichier
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ profileImage: file });
    }
  }

  openRegisterModal() {
    this.isRegisterModalOpen = true;
    this.registerForm.reset(); // Réinitialise également les champs lors de la fermeture

  }

  closeRegisterModal() {
    this.isRegisterModalOpen = false;
    this.registerForm.reset(); // Réinitialise également les champs lors de la fermeture

  }
  continueWithGoogle() {
    alert('Redirection via Google OAuth...');
    this.router.navigate(['/home']); // Remplacez par la logique réelle si nécessaire
  }

  continueWithFacebook() {
    alert('Redirection via Facebook OAuth...');
    this.router.navigate(['/home']); // Remplacez par la logique réelle si nécessaire
  }
}
