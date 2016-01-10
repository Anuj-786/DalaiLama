module.exports = {
  type: {
    isRequired: true,
    type: String,
    enum: '*type',
    english: {
      label: 'Title',
      defaultValue: '*title'
    },
    french: {
      label: 'Titre',
      defaultValue: '*title'
    }
  },
  language: {
    isRequired: true,
    type: String,
    english: {
      label: 'Title',
      defaultValue: '*title'
    },
    french: {
      label: 'Titre',
      defaultValue: '*title'
    }
  },
  person: {
    isRequired: true,
    type: 'person'
  }
}
