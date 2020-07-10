const validate = {
  /**
  * validate username
  * @username
  * @returns {boolean}
  */
  validateUsername (username) {
    const re = /^[a-zA-Z]([-_a-zA-Z0-9]{3,16})$/
    return re.test(username)
  },
  /**
  * validate email
  * @param email
  * @returns {boolean}
  */
  validateEmail (email) {
    const re = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
    return re.test(email)
  },
  /**
   * validate phone
   * @param phone
   * @returns {boolean}
   */
  validatePhone (phone) {
    const re = /^0?(13|14|15|17|18|19)[0-9]{9}$/
    return re.test(phone)
  },
  // 密码强度
  passwordStrength (password) {
    let res = {}
    let aLvTxt = ['极低', '低', '中', '高']
    let lv = 0
    if (password.match(/[a-z]/g)) {
      lv++
    }
    if (password.match(/[0-9]/g)) {
      lv++
    }
    if (password.match(/[A-Z]/g)) {
      lv++
    }
    if (password.match(/((?=[\x21-\x7e]+)[^A-Za-z0-9])/g)) {
      lv++
    }
    if (password.length < 6) {
      lv = 0
    }
    if (lv > 3) {
      lv = 3
    }
    res.lv = lv
    res.aLvTxt = aLvTxt[lv]
    return res
  }
}

export default validate
