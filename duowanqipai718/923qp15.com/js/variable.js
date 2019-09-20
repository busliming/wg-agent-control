var password = {
  brnn: '---.--..------./-..---.-.---.-./---..-..-.--.--/---..-..-.--.--',
  dzpk: '-.------.--.---/-.---.---.----./--...-..-.-...-/-.-...-.-..-.--',
  lhd: '-..------..--..-/-....--..-..---./--..-.--..-.---',
  ddz: '--..-.--..-.---/-.-.---..--..../-..---...---.--',
  zjh: '---....-.---.../-..-...---.-...-/-.....-.-.--...-',
  bjl:'---.--..------./-.--.---.--.--./-..---..-.-....',
  qp: '--.-...--..-.--/---..-..-..--..',
  yx: '--.---...---.../--...-.....----',
  by: '--...--.-.-.-.-/-..---...-----..'
}

function showText(className) {
  var classList = document.getElementsByClassName(className)
  for (var i = 0; i < classList.length; i++) {
    if (password[className]) {
      classList[i].innerHTML = xmorse.decode(password[className])
    }
  }
}
function showVariable () {
  let classNameList = Object.keys(password)
  for (var i = 0; i < classNameList.length; i++) {
    showText(classNameList[i])
  }
}
showVariable()