module.exports = {
  title: {
    isRequired: true,
    type: String,
    multiLingual: true,
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
    multiLingual: true,
    english: {
      label: 'Classification',
      enum: ['Teaching', 'Talk', 'Address', 'Message', 'Interaction', 'Longlife'],
    },
    french: {
      label: 'Classification',
      enum: ['TeachingFr', 'TalkFr', 'AddressFr', 'MessageFr', 'InteractionFr', 'LonglifeFr'],
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
    multiLingual: true,
    english: {
      label: 'Venue',
    },
    french: {
      label: 'Lieu',
    }
  },
  city: {
    type: String,
    multiLingual: true,
    english: {
      label: 'City',
    },
    french: {
      label: 'Ville',
    }
  },
  state: {
    type: String,
    multiLingual: true,
    english: {
      label: 'State',
    },
    french: {
      label: 'Etat',
    }
  },
  country: {
    type: String,
    multiLingual: true,
    english: {
      label: 'Country',
    },
    french: {
      label: 'Pays',
    }
  },
  languages: {
    type: [String],
    multiLingual: true,
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
    multiLingual: true,
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
  },
  translation: {
    type: String,
    english: {
      label: 'Translation',
    },
    french: {
      label: 'Traduction',
    }
  },**/
  keywords: {
    type: [String],
    multiLingual: true,
    english: {
      label: 'Keywords',
    },
    french: {
      label: 'Mots clés',
    }
  }
}
