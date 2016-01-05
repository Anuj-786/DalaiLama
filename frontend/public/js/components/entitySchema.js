module.exports = function() {
    return {
      title: {
        type: String,
        label: this.state.language.title.label,
        isRequired: true 
      },
      classifications: {
        type: String,
        enum: classifications,
        label: this.state.language.classification.label,
        defaultValue: 1,
      },
      startingDate: {
        type: Date,
        label: this.state.language.startingDate.label,
        defaultValue: '',
        isRequired: true,
      },
      endingDate: {
        type: Date,
        label: this.state.language.endingDate.label,
        defaultValue: '1212, 12, 12',
        isRequired: true,
      },
      venue: {
        type: String,
        label: this.state.language.venue.label,
        isRequired: true,
      },
      city: {
        type: String,
        label: this.state.language.city.label,
        isRequired: true,
      },
      state: {
        type: String,
        label: this.state.language.state.label,
        isRequired: true,
      },
      country: {
        type: String,
        label: this.state.language.country.label,
        isRequired: true,
      },
      languages: {
        type: [String],
        label: this.state.language.languages.label,
        defaultValue: [],
        isRequired: true,
      },
      description: {
        type: String,
        label: this.state.language.description.label,
        multiline: true,
        isRequired: true,
      },
      startingTime: {
        type: 'Time',
        label: this.state.language.startingTime.label,
        isRequired: true,
      },
      translation: {
        type: String,
        label: this.state.language.translation.label,
        isRequired: true,
      },
      keywords: {
        type: [String],
        label: this.state.language.keywords.label,
        defaultValue: [],
        isRequired: true,
      },
      publications: {
        type: String,
        label: this.state.language.publications.label,
        isRequired: true,
      },
    }
  },
