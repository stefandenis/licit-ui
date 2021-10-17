import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ThemeEnum, ThemeType } from './theme.models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: ThemeType;
  private renderer: Renderer2;
  private readonly localStorageThemeKey = 'theme';
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    const localStorageTheme = localStorage.getItem(this.localStorageThemeKey);
    if (localStorageTheme == null) {
      this.setDarkTheme();
    } else {
      localStorageTheme == ThemeEnum.DARK_THEME
        ? this.setDarkTheme()
        : this.setLightTheme();
    }
  }

  setTheme(colorTheme: ThemeType) {
    this.theme = colorTheme;
  }

  getTheme() {
    return this.theme;
  }

  updateTheme() {
    if (this.isDarkTheme()) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  isDarkTheme() {
    return this.theme == ThemeEnum.DARK_THEME ? true : false;
  }

  setDarkTheme() {
    console.log('salut');
    this.setTheme(ThemeEnum.DARK_THEME);
    this.renderer.addClass(document.body, ThemeEnum.DARK_THEME);
    localStorage.setItem(this.localStorageThemeKey, ThemeEnum.DARK_THEME);
  }

  setLightTheme() {
    this.setTheme(ThemeEnum.LIGHT_THEME);
    this.renderer.removeClass(document.body, ThemeEnum.DARK_THEME);
    localStorage.setItem(this.localStorageThemeKey, ThemeEnum.LIGHT_THEME);
  }
}
