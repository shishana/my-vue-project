
function getNewTags (checkedTags) {
  let allTags = this.$store.getters.tags
  let newTags = checkedTags.filter(element => {
    let isNew = true
    allTags.forEach(el => {
      if (el.name === element) {
        isNew = false
      }
    })
    return isNew
  })
  return newTags
}

function createTag (tag) {
  return new Promise((resolve, reject) => {
    this.$api.createTag(tag).then(res => {
      this.$store.commit('ADD_TAG', { name: tag, id: res.data.id })
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

export function updateTags (checkedTags, tagType) {
  return new Promise((resolve, reject) => {
    let newTags = getNewTags.call(this, checkedTags)
    let _pList = []
    newTags.forEach(el => {
      let p = createTag.call(this, el)
      _pList.push(p)
    })

    Promise.all(_pList).then(() => {
      setTimeout(() => {
        this.$store.dispatch('UPDATE_TAGS', { context: this, type: tagType })
      }, 1000)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}
