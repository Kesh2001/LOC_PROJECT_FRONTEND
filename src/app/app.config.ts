import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from "@primeng/themes/aura";
import { definePreset } from "@primeng/themes";
import { MyPreset } from './styles';
import { provideAnimations } from '@angular/platform-browser/animations'; // Key fix

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        providePrimeNG({
            theme: {

               preset: MyPreset,
               options:{
                cssLayer: {
                    name: 'primeng',
                    order: 'theme, base, primeng'
                },
                darkModeSelector:'.my-app-dark'
               }
            }
        })
    ]
};
