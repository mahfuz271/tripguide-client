
function LocalStore(key, value = 'no') {
    var settings = localStorage.getItem('learn');
    if (settings === null) {
      settings = {};
    } else {
      settings = JSON.parse(settings);
    }
    if (value === 'no') {
      if (key in settings) {
        return settings[key];
      } else {
        return false;
      }
    } else {
      if (value == '') {
        delete settings[key];
      } else {
        settings[key] = value;
      }
      localStorage.setItem('learn', JSON.stringify(settings));
    }
  }

  export default LocalStore;