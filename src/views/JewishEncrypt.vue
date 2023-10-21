<template>
  <span class="content__name">
      Атбаш
  </span>

  <div class="content__group">
    <span class="content__text-label content__item">Выберете язык для шифрования</span>
    <select v-model="selectedLanguage" class="content__item content__select">
      <option default>Русский</option>
      <option>Английский</option>
    </select>
  </div>

  <div class="content__group">
    <span class="content__text-label content__item">Введите текст для (де)шифрования</span>
    <input v-model="textToEnc" maxlength="100" class="content__item content__input"/>
  </div>

  <div class="content__group content__result">
    <span class="content__text-label content__item">Результат</span>
    <span class="content__text-primary content__item content__long-out">{{ encryptedText }}</span>
  </div>
</template>

<script>
export default {
    methods: {
      atbashEncrypt(strMessage, strAlphabet) {
        const lowMessage = strMessage.toLowerCase().split("")

        const alphabet = strAlphabet.split("")
        const revAlphabet = [].concat(alphabet).reverse()

        let encryptMess = ""
        for(let messLetter of lowMessage) {
          const indexMessLetter = alphabet.indexOf(messLetter)
          
          if(indexMessLetter == -1) {
            encryptMess += messLetter
            continue
          }
          
          encryptMess += revAlphabet[indexMessLetter]
        }

        return encryptMess
      },
      guiAtbash() {
        const alphRu = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
        const alphEn = "abcdefghijklmnopqrstuvwxyz"

        if(this.selectedLanguage == "Русский")
          this.encryptedText = this.atbashEncrypt(this.textToEnc, alphRu)

        if(this.selectedLanguage == "Английский")
          this.encryptedText = this.atbashEncrypt(this.textToEnc, alphEn)
      }
    },

    mounted() {
      this.guiAtbash()
    },

    watch: {
      textToEnc() {
        this.guiAtbash()
      },
      selectedLanguage() {
        this.guiAtbash()
      }
    },

    data() {
        return {
          selectedLanguage: "Английский",
          textToEnc: "Inostrannoe poslanie",
          encryptedText: "",
        };
    },
};
</script>