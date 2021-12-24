window.UEDITOR_HOME_URL = '/veditor/';

const loadVEditor = (callback = () => {}) => {
  import('../../veditor/veditor.config');
  import('../../veditor/veditor').then(() => {
    callback(window.UE);
  });
};

export default loadVEditor;
