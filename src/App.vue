<template>
  <header class="header">
    <div class="header__navbar content">
      <div class="header__title">
        <RouterLink to="/" class="link header__title__link">
          <img 
          src="./assets/logo.svg" class="header__title__link__logo"
          :class="{ 'filter-white': appearenceIsDark}"
          />
          <span class="header__title__link__text">Шифратор</span>
        </RouterLink>
      </div>

      <button @click="toggleMobMenu" class="header__mob-menu button">
        <img 
        src="./assets/menu.svg" class="header__mob-menu__logo"
        :class="{ 'filter-white': appearenceIsDark}"
        />
      </button>

      <div class="header__content">
        <nav class="header__content__nav">
          <RouterLink to="/atbash" class="nav__link nav__item link" active-class="nav__link_active">Атбаш</RouterLink>
          <RouterLink to="/cesar" class="nav__link nav__item link" active-class="nav__link_active">Шифр Цезаря</RouterLink>
          <RouterLink to="/vigenere" class="nav__link nav__item link" active-class="nav__link_active">Шифр Вижинера</RouterLink>
        </nav>
        <div class="header__content__appearence nav__item">
          <div class="header__content__appearence__container nav__item">
            <input
              @change="toggleTheme"
              id="checkbox-appearence"
              type="checkbox"
              class="appearence-checkbox"
            />
            <label for="checkbox-appearence" class="appearence-label">
              <div
                class="appearence-toggle"
                :class="{ 'appearence-toggle-checked': userTheme === 'dark-theme' }"
              ></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="screen">
    <div class="screen__mob-menu" v-show="mobMenuIsActive">
      <nav class="screen__mob-menu__links">
        <RouterLink to="/atbash" @click="switchOffMobMenu" class="screen__mob-menu__links__link link">Атбаш</RouterLink>
        <RouterLink to="/cesar" @click="switchOffMobMenu" class="screen__mob-menu__links__link link">Шифр Цезаря</RouterLink>
        <RouterLink to="/vigenere" @click="switchOffMobMenu" class="screen__mob-menu__links__link link">Шифр Вижинера</RouterLink>
      </nav>
      <div class="screen__mob-menu__appearence">
        <span class="screen__mob-menu__appearence__title">Тема</span>
        <div>
          <input
              @change="toggleTheme"
              id="checkbox-appearence"
              type="checkbox"
              class="appearence-checkbox"
            />
            <label for="checkbox-appearence" class="appearence-label">
              <div
                class="appearence-toggle"
                :class="{ 'appearence-toggle-checked': userTheme === 'dark-theme' }"
              ></div>
            </label>
        </div>
      </div>
    </div>
    <div class="screen__content" v-show="!mobMenuIsActive">
      <div class="screen__content__wrapper">
        <main class="screen__content__wrapper__main content">
          <RouterView></RouterView>
        </main>
      </div>
      <footer class="screen__content__copyright">©Copyright 2023, Сделал Илья Гусев</footer>
    </div>
  </div>

</template>

<script>
import { RouterView, RouterLink } from 'vue-router';

export default {
    methods: {
        toggleMobMenu() {
            this.mobMenuIsActive = !this.mobMenuIsActive;
        },
        SetIsMobile() {
            if (window.innerWidth <= 600) {
                this.isMobile = true;
            }
            else {
                this.isMobile = false;
            }
        },
        setTheme(theme) {
            localStorage.setItem("user-theme", theme);
            this.userTheme = theme;
            document.documentElement.className = theme;
        },
        toggleTheme() {
            const activeTheme = localStorage.getItem("user-theme");
            if (activeTheme === "light-theme") {
                this.setTheme("dark-theme");
            }
            else {
                this.setTheme("light-theme");
            }
        },
        getMediaPreference() {
            const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (hasDarkPreference) {
                return "dark-theme";
            }
            else {
                return "light-theme";
            }
        },
        getTheme() {
            return localStorage.getItem("user-theme");
        },
        switchOffMobMenu() {
          this.mobMenuIsActive = false;
        }
    },
    computed: {
        appearenceIsDark() {
            return this.userTheme == "dark-theme" ? true : false;
        },
    },
    mounted() {
        const initUserTheme = this.getTheme() || this.getMediaPreference();
        this.setTheme(initUserTheme);
    },
    created() {
        window.addEventListener("resize", this.SetIsMobile);
    },
    destroyed() {
        window.removeEventListener("resize", this.SetIsMobile);
    },
    watch: {
        isMobile(newIsMobile) {
            if (!newIsMobile && this.mobMenuIsActive) {
                this.mobMenuIsActive = false;
            }
        }
    },
    data() {
        return {
            userTheme: "light-theme",
            mobMenuIsActive: false,
            isMobile: false,
        };
    },
    components: { RouterView }
};
</script>