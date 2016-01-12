module.exports = {
  type: {
    isRequired: true,
    type: String,
    enum: ['Translator'],
    english: {
      label: 'Title',
    },
    french: {
      label: 'Titre',
    }
  },
  language: {
    isRequired: true,
    type: String,
    enum: ['English', 'Tibetan', 'Hindi', 'French'],
    english: {
      label: 'Title',
    },
    french: {
      label: 'Titre',
    }
  },
  person: {
    isRequired: true,
    type: 'person'
  }
}
