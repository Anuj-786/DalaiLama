var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var _ = require('underscore')
var TextField = require('material-ui/lib/text-field');
var Snackbar = require('material-ui/lib/snackbar');
var TimePicker = require('material-ui/lib/time-picker')
var moment = require('moment')
var styles = require('../../css/styles')
var SelectField = require('material-ui/lib/select-field')
var DatePicker = require('material-ui/lib/date-picker/date-picker')
var DropDownMenu = require('material-ui/lib/DropDownMenu')
var MenuItem = require('material-ui/lib/menus/menu-item')
var DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog')
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var FormGenerator = {
  /**
   * This creates a new FormGenerator form based on the schema
   * and gives it a particular ref for access later
   * @param  {Object} schema The mongoose-esque form schema
   * @param  {String} ref    The ref of the resultant JSX form
   * @param  {Function} onSubmit What do do on submission
   * @param  {Boolean} validateOnSubmit Wait until submit to validate
   * @return {JSX} The FormGeneratorForm for this schema
   */
  create: function(schema, ref, onSubmit, onCancel, validateOnSubmit) {
    return (
      <FormGeneratorForm
        schema={schema}
        ref={ref}
        onSubmit={onSubmit}
        onCancel={onCancel}
        validateOnSubmit={validateOnSubmit}/>
    );
  },

  /**
   * Generate a set of input fields based on a form schema.
   * @param  {Schema}   schema     A mongoose-yform schema
   * @param  {Any}      defaultValue The default value for this field
   * @param  {Function} onChange   Function to run any time a field changes
   * @param  {Boolean} validateOnSubmit Wait until submit to validate
   * @return {Array} An array of JSX Input fields representing the schema
   */
  generate: function(schema, defaultValue, onChange, validateOnSubmit) {
    // Special case for array schemas
    if (_.isArray(schema)) {
      return [
        <ArrayField
          ref={key}
          schema={schema[0]}
          onChange={onChange}/>
      ];
    }
    var fields = [];
    for (var key in schema) {
      var field = schema[key];
      // Lower level default values take precedence
      defaultValue = defaultValue || {};
      var defaultVal = field.defaultValue || defaultValue[key] || '';

      if (typeof field.type === 'object') {
        // Validate that it's an array
        if (field.type.length && field.type.length === 1) {
          // Array of native type like [String]
          // or [{ object: type, like: this }]
          fields.push(
            <ArrayField
              ref={key}
              label={field.label}
              schema={field.type[0]}
              onChange={onChange}
              defaultValue={defaultVal}
              validateOnSubmit={validateOnSubmit}/>
          );
        } else {
          // Regular { embedded: object }
          fields.push(
            <ObjectField
              ref={key}
              label={field.label}
              schema={field.type}
              onChange={onChange}
              defaultValue={defaultVal}
              validateOnSubmit={validateOnSubmit}/>
          );
        }
      } else {
        // Flat field
        fields.push(
          this.generateFlatField(
            key, field, defaultVal, onChange, validateOnSubmit
          )
        );
      }
    }
    return fields;
  },

  /**
   * Generate a flat field based on its name and type data
   * @param  {String}   name     The name (ref) of the field
   * @param  {Object}   field    The Field object
   * @param  {String}   defaultValue The default value for this field
   * @param  {Function} onChange Function to run any time a field changes
   * @param  {Boolean} validateOnSubmit Wait until submit to validate
   * @return {JSX}      A JSX representation of the field
   */
  generateFlatField: function(name, field, defaultValue, onChange, validateOnSubmit) {
    var validators =
      field.validators || (field.validate && [field.validate]) || [];

    if (field.hidden) {
      return (
        <FlatField
          type='hidden'
          ref={name}
          defaultValue={defaultValue}/>
      );
    }

    if (field.type === String || field.type === Number) {
      if (field.enum) {
        return (
          <FlatField
            type='select'
            ref={name}
            label={field.label || ''}
            placeholder={field.enum[0] || ''}
            defaultValue={defaultValue || ''}
            fields={ _.map(field.enum, function(val, key) {
                return {payload: key, text: val}
              })
            }
            validators={validators}
            onChange={onChange}
            isRequired={field.isRequired}
            validateOnSubmit={validateOnSubmit}/>
        );
      } 
      else if (field.multiselect) {
        return (
          <FlatField
            type='multiselect'
            ref={name}
            label={field.label}
            placeholder={field.label || ''}
            defaultValue={defaultValue}
            validators={validators}
            onChange={onChange}
            isRequired={field.isRequired}
            isNumerical={field.type === Number}
            validateOnSubmit={validateOnSubmit}/>
        );
      }
      else {
        return (
          <FlatField
            type={field.isPassword ? 'password' : 'text'}
            ref={name}
            label={field.label}
            placeholder={field.label || ''}
            defaultValue={defaultValue}
            validators={validators}
            onChange={onChange}
            isRequired={field.isRequired}
            multiline={field.multiline || false}
            isNumerical={field.type === Number}
            validateOnSubmit={validateOnSubmit}/>
        );
      }
    }
    else if (field.type === Boolean) {
      return (
        <FlatField
          type='checkbox'
          label={field.label}
          ref={name}
          defaultValue={defaultValue}
          validators={validators}
          onChange={onChange}
          isRequired={field.isRequired}
          validateOnSubmit={validateOnSubmit}/>
      );
    }
    else if (field.type === Date) {
      return (
        <FlatField
          type='date'
          label={field.label}
          ref={name}
          defaultValue={defaultValue || ''}
          validators={validators}
          onChange={onChange}
          isRequired={field.isRequired}
          validateOnSubmit={validateOnSubmit}/>
      );
    } else if(field.type === 'Time') {
      return (
        <FlatField
          type='time'
          label={field.label}
          ref={name}
          defaultValue={defaultValue || ''}
          validators={validators}
          onChange={onChange}
          isRequired={field.isRequired}
          validateOnSubmit={validateOnSubmit}/>
      )
    }
    else {
      throw 'Unsupported type';
    }
  },

  // Useful validator functions
  validators: {
    lengthEquals: function(len) {
      return function(val) {
        return (val || '').length !== len
          ? 'Error: must be of length ' + len
          : null;
      };
    },

    minLength: function(min) {
      return function(val) {
        return (val || '').length < min
          ? 'Error: must be at least ' + min + ' characters'
          : null;
      };
    },

    maxLength: function(max) {
      return function(val) {
        return (val || '').length > max
          ? 'Error: must be less than ' + (max + 1) + ' characters'
          : null;
      };
    },

    regex: function(regex) {
      return function(val) {
        return !(val || '').match(regex)
          ? 'Error: invalid input'
          : null;
      };
    },

    nonEmpty: function() {
      return function(val) {
        return !val
          ? 'Error: field is required'
          : null;
      };
    },

    number: function() {
      return function(val) {
        return isNaN(val)
          ? 'Error: value must be numerical'
          : null;
      };
    }
  }
};

var FormGeneratorForm = React.createClass({
  propTypes: {
    schema: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func,
    defaultValue: React.PropTypes.object,
    label: React.PropTypes.string,
    validateOnSubmit: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      label: '',
      onSubmit: function() {}
    };
  },

  getInitialState: function() {
    return {
      isValid: true,
      validateOnSubmit: this.props.validateOnSubmit
    };
  },

  onChange: function() {
    var that = this;
    setTimeout(function() {
      that.setState({
        isValid: that.isValid()
      });
    }, 100);
  },

  onSubmit: function() {
    if (this.state.validateOnSubmit && !this.state.isValid) {
      return this.setState({
        validateOnSubmit: false
      }, this.showErrorMessages);
    }
    var onSubmit = this.props.onSubmit;
    onSubmit && onSubmit(this.getValue());
  },

  getValue: function() {
    return this.refs.toplevelForm.getValue();
  },

  setValue: function(val) {
    this.refs.toplevelForm.setValue(val);
  },

  reset: function() {
    this.refs.toplevelForm.reset();
  },

  isValid: function() {
    return this.refs.toplevelForm.isValid();
  },

  showErrorMessages: function() {
    this.refs.toplevelForm.showErrorMessages();
  },

  render: function() {
    var buttonDisabled = this.state.validateOnSubmit
      ? false
      : !this.state.isValid;

    return (
      <form>
        <ObjectField ref='toplevelForm'
          schema={this.props.schema}
          defaultValue={this.props.defaultValue}
          label={this.props.label}
          onChange={this.onChange}
          validateOnSubmit={this.state.validateOnSubmit}/>
        <RaisedButton
          style={styles.fileSubmitButton}
          label="Submit"
          onClick={this.onSubmit}
          disabled={buttonDisabled}/>
        <RaisedButton
          label="Cancel"
          onClick={this.props.onCancel}
        />
      </form>
    );
  }
});

var ObjectField = React.createClass({
  propTypes: {
    schema: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string,
    defaultValue: React.PropTypes.object,
    validateOnSubmit: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      label: ''
    };
  },

  getInitialState: function() {
    return {};
  },

  getValue: function() {
    var that = this;
    return _.mapObject(this.props.schema, function(val, key) {
      return that.refs[key].getValue();
    });
  },

  setValue: function(newValue) {
    var refs = this.refs;
    for (var key in this.props.schema) {
      refs[key].setValue(newValue[key]);
    }
  },

  reset: function() {
    for (var field in this.props.schema) {
      this.refs[field].reset();
    }
  },

  onChange: function() {
    this.props.onChange();
  },

  isValid: function() {
    var valid = true;
    for (var field in this.props.schema) {
      valid = valid && this.refs[field].isValid();
    }
    return valid;
  },

  showErrorMessages: function() {
    for (var field in this.props.schema) {
      this.refs[field].showErrorMessages();
    }
  },

  render: function() {
    var subFields = FormGenerator.generate(
      this.props.schema,
      this.props.defaultValue,
      this.props.onChange,
      this.props.validateOnSubmit
    );
    return (
      <div>
        {subFields}
      </div>
    );
  }
});

var ArrayField = React.createClass({
  propTypes: {
    schema: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.object
    ]).isRequired,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string,
    initialLength: React.PropTypes.number,
    validateOnSubmit: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      defaultValue: [],
      label: '',
      initialLength: 1,
      refPrefix: 'array_ref'
    };
  },

  getInitialState: function() {
    var negativeOrZero = function(num) {
      return num < 0 ? 0 : num;
    };
    var defaultLength = negativeOrZero(this.props.defaultValue.length);
    var initialLength = negativeOrZero(this.props.initialLength);
    var actualLength = defaultLength || initialLength || 1;
    return {
      size: actualLength,
      tags: this.props.defaultValue,
      value: '',
      focusDiv: {borderBottom: '1px solid #E0E0E0'}
    };
  },

  getValue: function() {
    var that = this;
    var refPrefix = this.props.refPrefix;
    var values = [];
    /*_.times(this.state.size, function(i) {
      values.push(that.refs[refPrefix + i].getValue());
    });*/
    return this.state.tags;
  },

  setValue: function(values) {
    var refs = this.refs;
    this.setState({
      size: values.length || 1
    },
    function() {
      var refPrefix = this.props.refPrefix;
      _.each(values, function(value, i) {
        refs[refPrefix + i].setValue(value);
      });
    });
  },

  reset: function() {
    this.setState({tags: this.props.defaultValue, value: ''})
  },

  isValid: function() {
    var that = this;
    var refPrefix = this.props.refPrefix;
    var valid = true;
    /*_.times(this.state.size, function(i) {
      valid = valid && that.refs[refPrefix + i].isValid();
    });*/
    return valid;
  },

  showErrorMessages: function() {
    var that = this;
    var refPrefix = this.props.refPrefix;
    _.times(this.state.size, function(i) {
      that.refs[refPrefix + i].showErrorMessages();
    });
  },

  addField: function() {
    this.setState({
      size: this.state.size + 1
    });
  },

  removeField: function() {
    var decremented = this.state.size - 1;
    // Don't let the number of values become < 1
    this.setState({
      size: decremented || 1
    });
  },

  addTag: function(e) {
    
    if(e.keyCode == 13 || e.keyCode === 9) {
      if(!_.includes(this.state.tags, this.state.value) && this.state.value.length && !this.state.value.trim() == '') {
    console.log(this.state.value.length)
        this.state.tags.push(this.state.value)
        this.setState({value: ''})

        if(e.preventDefault) {
          e.preventDefault();
        }
      }
    }

    if(e.keyCode == 8) {
      if(this.state.tags.length && !this.state.value.length) {
        console.log(e.keyCode)
        this.state.tags.pop() 
        this.forceUpdate()
      }
    }

  },

  onChangeTag: function(e) {
    this.setState({value: e.target.value})
  },

  removeTag: function(e) {
    this.state.tags.splice(e.target.dataset.val, 1)
    this.forceUpdate()
  },

  changeColor: function() {
    this.setState({
      focusDiv: {
        borderBottom: '2px solid #00bcd4'
      }
    })
  },

  removeColor: function() {
    this.setState({
      focusDiv: {
        borderBottom: '1px solid #E0E0E0'
      }
    })
  },

  render: function() {
    var that = this;
    var schema = this.props.schema;
    var refPrefix = this.props.refPrefix;
    var defaultValue = this.props.defaultValue;
    var onChange = this.props.onChange;
    var validateOnSubmit = this.props.validateOnSubmit;

    var arrayFields = [];
    _.times(this.state.size, function(i) {
      var defaultVal = (defaultValue && defaultValue[i]) || '';
      var fieldRef = refPrefix + i;
      // Flat/native type
      if (typeof schema === 'function') {
        var mockSchema = {
          type: schema,
          label: that.props.label,
          defaultValue: defaultVal
        };
        arrayFields.push(
          FormGenerator.generateFlatField(
            fieldRef, mockSchema, defaultVal, onChange, validateOnSubmit
          )
        );
      } else {
        // It's an object or an object array, so use 'generate'
        var schemaWrapper = {};
        schemaWrapper[fieldRef] = {
          type: schema,
          defaultValue: defaultVal
        };
        arrayFields.push(
          FormGenerator.generate(
            schemaWrapper, defaultVal, onChange, validateOnSubmit
          )
        );
      }
    });
    return (
      <div>
          <div className="tags" style={this.state.focusDiv}>
            {that.state.tags.map(function(value, key) {
              return (
                <span className="tag" key={key}>{value}
                <span><i data-val={key} onClick={that.removeTag} className="material-icons closeIcon">close</i></span>
                </span>
              )
            }.bind(that))}            
          <TextField 
            value={that.state.value} 
            onKeyDown={that.addTag} 
            onChange={that.onChangeTag} 
            style={{width: '50px', marginLeft: '2px'}}
            underlineStyle={{display: 'none'}}
            onFocus={this.changeColor}
            onBlur={this.removeColor}
            hintText={that.props.label}/> 
          </div>
      </div>
    );
  }
});

var FlatField = React.createClass({
  propTypes: {
    // text or select
    type: React.PropTypes.string,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    children: React.PropTypes.array,
    defaultValue: React.PropTypes.string,
    validators: React.PropTypes.arrayOf(React.PropTypes.func),
    onChange: React.PropTypes.func,
    isRequired: React.PropTypes.bool,
    isNumerical: React.PropTypes.bool,
    isPassword: React.PropTypes.bool,
    validateOnSubmit: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      type: 'text',
      label: '',
      placeholder: '',
      children: [],
      validators: [],
      onChange: function() {},
      defaultValue: '',
      isRequired: false,
      isNumerical: false,
    };
  },

  getInitialState: function() {
    console.log(this.props.defaultValue)
    return {
      value: this.props.defaultValue || '',
      tags: [],
      errorMessages: []
    };
  },

  componentDidMount: function() {
    var errorMessages = this.props.validateOnSubmit
      ? []
      : this.validate(this.getValue());

    this.setState({
      errorMessages: errorMessages
    });
    this.props.onChange();
  },

  validate: function(value) {
    var validators = this.props.validators;
    // If required, add the nonEmpty validator
    validators = this.props.isRequired
      ? validators.concat([FormGenerator.validators.nonEmpty()])
      : validators;

    // If type Number, add the number validator
    validators = this.props.isNumerical
      ? validators.concat([FormGenerator.validators.number()])
      : validators;

    return _.compact(
      _.map(validators, function(validate) {
        return validate(value);
      })
    );
  },

  isValid: function() {
    return !this.validate(this.getValue()).length;
  },

  showErrorMessages: function() {
    this.setState({
      errorMessages: this.validate(this.getValue())
    });
  },

  getValue: function() {
    return this.state.value;
  },

  setValue: function(newValue) {
    var errorMessages = this.props.validateOnSubmit
      ? []
      : this.validate(this.getValue());

    this.setState({
      value: newValue,
      errorMessages: errorMessages
    }, this.props.onChange);
  },

  reset: function() {
    this.setValue(this.props.defaultValue);
    this.setState({value: this.props.defaultValue})
  },

  onChange: function(e) {
    // If checkbox type, toggle value;
    // otherwise, use the event target value
    var newValue = this.props.type === 'checkbox'
      ? !this.state.value
      : e.target.value;

    this.setValue(newValue);
  },

  onChangeSelect: function(e, index) {
    this.setValue(index) 
  },

  _handleChange: function(e, date) {
    this.setValue(date) 
  },

  changeTime: function(e, time) {
    this.setValue(moment(time).format('h:mm a'))
  },

  addTag: function(e) {
    

    if(e.keyCode == 13 || e.keyCode === 9) {
      if(!_.includes(this.state.tags, this.state.value)) {
        this.state.tags.push(this.state.value)
        this.setState({value: ''})

        if(e.preventDefault) {
          e.preventDefault();
        }
      }
    }

  },

  onChangeTag: function(e , index) {
    console.log(index)
    this.setValue(e.target.value)
  },

  removeTag: function(e) {
    this.state.tags.splice(e.taget.dataset.val, 1)
    this.forceUpdate()
  },

  render: function() {
    var errorClass = this.state.errorMessages.length
      ? ' has-error'
      : '';

    return (function(that) {
      switch (that.props.type) {
        case 'text':
        case 'password': return (
          <div className={'form-group' + errorClass}>
            <TextField
              type={that.props.type}
              floatingLabelText={that.props.label}
              hintText={that.props.placeholder}
              multiLine={that.props.multiline}
              errorText={that.state.errorMessages[0]}
              onChange={that.onChange}
              value={that.state.value}/>
          </div>
        );
        case 'checkbox': return (
          <input
            type={that.props.type}
            label={that.props.label}
            placeholder={that.props.placeholder}
            onChange={that.onChange}
            checked={that.getValue()}/>
        );
        case 'select': return (
          <div>
            <SelectField
              value={that.state.value}
              onChange={that.onChangeSelect}
              hintText={that.props.label}
              menuItems={that.props.fields} />
          </div>
        );
        case 'date': return (
          <DatePicker
            hintText={that.props.label}
            value={that.state.value}
            mode="landscape"
            onChange={that._handleChange} />
        );
        case 'time': return (
          <TimePicker
            format="ampm"
            style={{marginTop: '1em'}}
            value={that.state.value}
            onChange={that.changeTime}
            hintText={that.props.label} />
        )
        case 'hidden': return null;
      }
    })(this);
  }
});

module.exports = FormGenerator;
