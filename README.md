custom-checkbox-radio
=====================

Easy custom checkbox/radio using images or font-awesome. Include custom-checkbox.js and css/custom-checkbox.css and you are ready to go.

### Default usage
Will customize all input of type checkbox, considering btn-checkbox.png is in /assets/images/

```javascript
$.CustomCheckbox();
```

### Radio buttons

```javascript
$.CustomCheckbox('input[type="radio"]', {
    imagePath: 'assets/images/btn-radio.png',
    type: "radio",
});
```

### With font-awesome
**You have to include the library : http://fortawesome.github.io/Font-Awesome/get-started/**

```javascript
$.CustomCheckbox('input[type="checkbox"].custom-awesome', {
    fontAwesome: true
});

$.CustomCheckbox('input[type="radio"].custom-awesome', {
    fontAwesome: true,
    type: "radio"
});
```

### List of options with default value

**exclude**: null,      // jquery objects to exclude. Example: $('input.not-custom')  
**fontAwesome**: false, // set to true if you want ot use font-awesome instead of a sprite  
**imagePath**: 'assets/images/btn-radio.png',  
**imageHeight**: 24,    // set width of each state in sprite (if using other image than the one provided)  
**imageWidth**: 23,     // set width of each state in sprite (if using other image than the one provided)  
**bgOffset**: 0,        // change background offset (if using other image than the one provided)  
**type**: 'radio'       // checkbox or radio  
