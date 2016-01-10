module.exports = {
  title: {
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
  sessions: {
    type: ['session']
  },
  speakers: {
    type: ['speaker']
  },
  classification: {
    isRequired: true,
    type: String,
    enum: '*classification',
    english: {
      label: 'Classification',
      defaultValue: '*classification'
    },
    french: {
      label: 'Classification',
      defaultValue: '*classification'
    }
  },
  startingDate: {
    defaultValue: '*startingDate',
    type: Date,
    isRequired: true
  },
  endingDate: {
    type: Date,
    defaultValue: '*endingDate',
    isRequired: true
  },
  venue: {
    isRequired: true,
    type: String,
    english: {
      label: 'Venue',
      defaultValue: '*venue'
    },
    french: {
      label: 'Lieu',
      defaultValue: '*venue'
    }
  },
  city: {
    isRequired: true,
    type: String,
    english: {
      label: 'City',
      defaultValue: '*city'
    },
    french: {
      label: 'Ville',
      defaultValue: '*city'
    }
  },
  state: {
    isRequired: true,
    type: String,
    english: {
      label: 'State',
      defaultValue: '*state'
    },
    french: {
      label: 'Etat',
      defaultValue: '*state'
    }
  },
  country: {
    type: String,
    isRequired: true,
    english: {
      label: 'Country',
      defaultValue: '*country'
    },
    french: {
      label: 'Pays',
      defaultValue: '*country'
    }
  },
  languages: {
    type: [String],
    isRequired: true,
    english: {
      label: 'Laguagues',
      defaultValue: '*languages'
    },
    french: {
      label: 'Langues',
      defaultValue: '*languages'
    }
  },
  description: {
    isRequired: true,
    multiline: true,
    type: String,
    english: {
      label: 'Description',
      defaultValue: '*description'
    },
    french: {
      label: 'Description',
      defaultValue: '*description'
    }
  },
  startingTime: {
    isRequired: true,
    type: Date,
    defaultValue: '*startingTime'
  },
  translation: {
    isRequired: true,
    type: String,
    english: {
      label: 'Translation',
      defaultValue: '*translation'
    },
    french: {
      label: 'Traduction',
      defaultValue: '*translation'
    }
  },
  keywords: {
    isRequired: true,
    type: [String],
    english: {
      label: 'Keywords',
      defaultValue: '*keywords'
    },
    french: {
      label: 'Mots clés',
      defaultValue: '*keywords'
    }
  }
}
