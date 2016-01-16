module.exports = {
  event: {
    type: ['event']
  },
  title: {
    isRequired: true,
    multiLingual: true,
    type: String,
    english: {
      label: 'Title'
    },
    french: {
      label: 'Titre'
    }
  },
  description: {
    isRequired: true,
    multiLingual: true,
    type: String,
    english: {
      label: 'description'
    },
    french: {
      label: 'la description'
    }
  }
}
