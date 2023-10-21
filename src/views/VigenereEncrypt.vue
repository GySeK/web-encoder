<template>
  <span class="content__name">
      Шифр Вижинера
  </span>

  <div class="content__group">
    <span class="content__text-label content__item">Выберете режим шифрования</span>
    <select v-model="selectedMode" class="content__item content__select">
      <option value="encrypt" default>Шифрование</option>
      <option value="decrypt">Дешифрование</option>
    </select>
  </div>

  <div class="content__group">
    <span class="content__text-label content__item">Выберете язык для (де)шифрования</span>
    <select v-model="selectedLanguage" class="content__item content__select">
      <option default>Русский</option>
      <option>Английский</option>
    </select>
  </div>

  <div class="content__group">
    <span class="content__text-label content__item">Введите текст для (де)шифрования</span>
    <input v-model="textToEnc" maxlength="100" class="content__item content__input"/>
  </div>

  <div class="content__group">
    <span class="content__text-label content__item">Введите ключ шифрования</span>
    <input v-model="encKey" maxlength="100" class="content__item content__input"/>
  </div>

  <div class="content__group content__result">
    <span class="content__text-label content__item">Результат</span>
    <span class="content__text-primary content__item content__long-out">{{ encText }}</span>
  </div>
</template>

<script>
export default {
    methods: {
      vigenereEncrypt(message, key, alphabet) {
        message = message.toLowerCase();
        key = key.toLowerCase();

        var cipherText = "";
        var alphabetLength = alphabet.length;

        for (var i = 0; i < message.length; i++) {
          var messageChar = message.charAt(i);
          var keyChar = key.charAt(i % key.length);

          if (alphabet.includes(messageChar)) {
            var messageIndex = alphabet.indexOf(messageChar);
            var keyIndex = alphabet.indexOf(keyChar);

            var cipherIndex = (messageIndex + keyIndex) % alphabetLength;

            var cipherChar = alphabet[cipherIndex];

            cipherText += cipherChar;
          } else {
            cipherText += messageChar;
          }
        }

        return cipherText;
      },

      vigenereDecrypt(ciphertext, keyword, alphabet) {
        ciphertext = ciphertext.toLowerCase();
        keyword = keyword.toLowerCase();

        const ciphertextLength = ciphertext.length;
        const keywordLength = keyword.length;
        const alphabetLength = alphabet.length;

        let plaintext = '';

        for (let i = 0; i < ciphertextLength; i++) {
          const ciphertextChar = ciphertext[i];
          const keywordChar = keyword[i % keywordLength];

          // Find the position of the ciphertext character and the keyword character in the alphabet
          const ciphertextCharIndex = alphabet.indexOf(ciphertextChar);
          const keywordCharIndex = alphabet.indexOf(keywordChar);

          if (ciphertextCharIndex === -1) {
            // If the current character is not in the alphabet, add it to the plaintext as is
            plaintext += ciphertextChar;
            continue;
          }

          // Compute the position of the decrypted character
          const decryptedCharIndex = (ciphertextCharIndex - keywordCharIndex + alphabetLength) % alphabetLength;

          // Find the decrypted character in the alphabet
          const decryptedChar = alphabet[decryptedCharIndex];

          plaintext += decryptedChar;
        }

        return plaintext;
      },

      guiVigenere() {
        const alphRu = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
        const alphEn = "abcdefghijklmnopqrstuvwxyz"

        if(this.selectedMode == "encrypt") {
          if(this.selectedLanguage == "Русский")
            this.encText = this.vigenereEncrypt(this.textToEnc, this.encKey, alphRu)

          if(this.selectedLanguage == "Английский")
            this.encText = this.vigenereEncrypt(this.textToEnc, this.encKey, alphEn)
        }

        if(this.selectedMode == "decrypt") {
          if(this.selectedLanguage == "Русский")
            this.encText = this.vigenereDecrypt(this.textToEnc, this.encKey, alphRu)

          if(this.selectedLanguage == "Английский")
            this.encText = this.vigenereDecrypt(this.textToEnc, this.encKey, alphEn)
        }
      }
    },

    mounted() {
      this.guiVigenere()
    },

    watch: {
      selectedMode() {
        this.guiVigenere()
      },

      selectedLanguage() {
        this.guiVigenere()
      },

      textToEnc() {
        this.guiVigenere()
      },

      encKey() {
        this.guiVigenere()
      },
    },

    data() {
        return {
          selectedMode: "encrypt",
          selectedLanguage: "Русский",
          textToEnc: "Пример текста",
          encKey: "Ключ",
          encText: "",
        };
    },
};
</script>