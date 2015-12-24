var addEvent = function() {
 return {
  title: {
    type: String,
    label: this.state.language.title.label,
    isRequired: 
  },
  classification: {
    type: String,
    label: this.state.language.classification.label,
    isRequired: true,
  },
  startingDate: {
    type: Date,
    label: this.state.language.startingDate.label,
    isRequired: true,
  },
  endingDate: {
    type: Date,
    label: this.state.language.endingDate.label,
    isRequired: true,
  },
  venue: {
    type: String,
    label: this.state.language.venue.label,
    isRequired: true
  }
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
    label: this.state.country.state.label,
    isRequired: true,
  },
  languages: {
    type: String,
    label: this.state.language.state.label,
    isRequired: true,
  },
  description: {
    type: String,
    label: this.state.description.state.label,
    isRequired: true,
  },
  startingTime: {
    type: Date,
    label: this.state.startingTime.state.label,
    isRequired: true,
  },
  speakers: {
    type: [String],
    label: this.state.speakers.state.label,
    isRequired: true,
  },
  translation: {
    type: String,
    label: this.state.translation.state.label,
    isRequired: true,
  },
  sessions: {
    type: [String],
    label: this.state.sessions.state.label,
    isRequired: true,
  },
  keywords: {
    type: [String],
    label: this.state.Keywords.state.label,
    isRequired: true,
  },
  publications: {
    type: [String],
    label: this.state.Keywords.state.label,
    isRequired: true,
  },
 }
}
