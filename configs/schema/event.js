module.exports = {
  title: {
    isRequired: true,
    type: String,
    english: {
      label: 'Title',
    },
    french: {
      label: 'Titre',
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
    enum: ['Teaching', 'Talk', 'Address', 'Message', 'Interaction', 'Longlife'],
    english: {
      label: 'Classification',
    },
    french: {
      label: 'Classification',
    }
  },
  startingDate: {
    type: Date,
    english: {
      label: 'Starting Date'
    },
    french: {
      label: 'date de début'
    }
  },
  endingDate: {
    type: Date,
    english: {
      label: 'Ending Date'
    },
    french: {
      label: 'date de fin'
    }
  },
  venue: {
    type: String,
    english: {
      label: 'Venue',
    },
    french: {
      label: 'Lieu',
    }
  },
  city: {
    type: String,
    english: {
      label: 'City',
    },
    french: {
      label: 'Ville',
    }
  },
  state: {
    type: String,
    english: {
      label: 'State',
    },
    french: {
      label: 'Etat',
    }
  },
  country: {
    type: String,
    english: {
      label: 'Country',
    },
    french: {
      label: 'Pays',
    }
  },
  languages: {
    type: [String],
    english: {
      label: 'Laguagues',
    },
    french: {
      label: 'Langues',
    }
  },
  description: {
    multiline: true,
    type: String,
    english: {
      label: 'Description',
    },
    french: {
      label: 'Description',
    }
  },
  /**startingTime: {
    isRequired: true,
    type: Date,
    english: {
      label: 'Starting Date',
    },
    french: {
      label: 'Heure de départ',
    }
  },**/
  translation: {
    type: String,
    english: {
      label: 'Translation',
    },
    french: {
      label: 'Traduction',
    }
  },
  keywords: {
    type: [String],
    english: {
      label: 'Keywords',
    },
    french: {
      label: 'Mots clés',
    }
  }
}
