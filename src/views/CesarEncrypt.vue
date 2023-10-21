<template>
  <span class="content__name">
      Шифр Цезаря
  </span>

  <div class="content__group">
    <span class="content__text-label content__item">Выберете режим шифрования</span>
    <select v-model="selectedMode" class="content__item content__select">
      <option value="encrypt" default>Шифрование</option>
      <option value="decrypt">Дешифрование</option>
    </select>
  </div>

  <div class="content__group">
    <span class="content__text-label content__item">Выберете язык для шифрования</span>
    <select v-model="selectedLanguage" class="content__item content__select">
      <option default>Русский</option>
      <option>Английский</option>
    </select>
  </div>

  <div class="content__group">
    <span class="content__text-label content__item">Введите текст для шифрования</span>
    <input v-model="textToEnc" maxlength="100" class="content__item content__input"/>
  </div>

  <div class="content__group">
    <span class="content__text-label content__item">Введите сдвиг шифрования</span>
    <input type=number inputMode="numeric" v-model="shiftEnc" min="-99" max="99" class="content__item content__input"/>
  </div>

  <div class="content__group content__result">
    <span class="content__text-label content__item">Результат</span>
    <span class="content__text-primary content__item content__long-out">{{ encryptedText }}</span>
  </div>
</template>

<script>
export default {
    methods: {
      caesarEncrypt(message, shift, alphabet) {
        message = message.toLowerCase();
        alphabet = alphabet.toLowerCase();

        let result = '';

        for (let i = 0; i < message.length; i++) {
          const char = message[i];
          const charIndex = alphabet.indexOf(char);

          if (charIndex !== -1) {
            let newCharIndex = (charIndex + shift) % alphabet.length;

            if (newCharIndex < 0) {
              newCharIndex += alphabet.length;
            }

            result += alphabet[newCharIndex];
          } else {
            result += char;
          }
        }

        return result;
      },
      caesarDecrypt(message, shift, alphabet) {
        shift = -1 * shift
        message = message.toLowerCase();
        alphabet = alphabet.toLowerCase();

        let result = '';

        for (let i = 0; i < message.length; i++) {
          const char = message[i];
          const charIndex = alphabet.indexOf(char);

          if (charIndex !== -1) {
            let newCharIndex = (charIndex + shift) % alphabet.length;

            if (newCharIndex < 0) {
              newCharIndex += alphabet.length;
            }

            result += alphabet[newCharIndex];
          } else {
            result += char;
          }
        }

        return result;
      },
      guiCaesar() {
        const alphRu = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
        const alphEn = "abcdefghijklmnopqrstuvwxyz"

        if(this.selectedMode == "encrypt") {
          if(this.selectedLanguage == "Русский")
          this.encryptedText = this.caesarEncrypt(this.textToEnc, this.shiftEnc, alphRu)

          if(this.selectedLanguage == "Английский")
            this.encryptedText = this.caesarEncrypt(this.textToEnc, this.shiftEnc, alphEn)
        }

        if(this.selectedMode == "decrypt") {
          if(this.selectedLanguage == "Русский")
          this.encryptedText = this.caesarDecrypt(this.textToEnc, this.shiftEnc, alphRu)

          if(this.selectedLanguage == "Английский")
            this.encryptedText = this.caesarDecrypt(this.textToEnc, this.shiftEnc, alphEn)
        }
      }
    },

    mounted() {
      this.guiCaesar()
    },

    watch: {
      selectedLanguage() {
        this.guiCaesar()
      },

      selectedMode() {
        this.guiVigenere()
      },

      textToEnc() {
        this.guiCaesar()
      },

      shiftEnc() {
        this.guiCaesar()
      },
    },

    data() {
        return {
          selectedMode: "encrypt",
          selectedLanguage: "Русский",
          textToEnc: "Пример текста",
          shiftEnc: 3,
          encryptedText: "",
        };
    },
};
</script>