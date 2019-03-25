require('./base-css.js');
require('../css/files-dialog.css');
var React = require('react');
var ReaceDOM = require('react-dom');
var Dialog = require('./dialog');
var util = require('./util');

var MAX_FILE_SIZE = 1024 * 1024 * 20;

var FilesDialog = React.createClass({
  show: function(data) {
    this.refs.filesDialog.show();
  },
  hide: function() {
    this.refs.filesDialog.hide();
  },
  showNameInput: function() {
    this.refs.filename.show();
  },
  submit: function() {
    var file = this.formData.get('file');
    if (!file.size) {
      return alert('The file size can not be empty.');
    }
    if (file.size > MAX_FILE_SIZE) {
      return alert('The file size can not exceed 20m.');
    }
    var self = this;
    var params = { name: 'test' };
    util.readFileAsBase64(file, function(base64) {
      params.base64 = base64;
      ReaceDOM.findDOMNode(self.refs.file).value = '';
      self.showNameInput();
    });
  },
  uploadFile: function() {
    var form = ReaceDOM.findDOMNode(this.refs.uploadFileForm);
    this.formData = new FormData(form);
    this.submit();
  },
  selectFile: function() {
    ReaceDOM.findDOMNode(this.refs.file).click();
  },
  render: function() {
    return (
      <Dialog wstyle="w-files-dialog" ref="filesDialog">
          <div className="modal-body">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
            <button className="w-files-upload-btn" onClick={this.selectFile}>
              <span className="glyphicon-plus"></span>
              Click here or drag the file to the page to upload (size &lt;= 20m)
            </button>
            <h4>System Files</h4>
            <table className="table">
              <thead>
                <th className="w-files-order">#</th>
                <th className="w-files-path">Path</th>
                <th className="w-files-operation">Operation</th>
              </thead>
              <tbody>
                <tr>
                  <th className="w-files-order">1</th>
                  <td className="w-files-path">$whistle/xxxx.txt</td>
                  <td className="w-files-operation">
                    <a href="javascript:;">Copy path</a>
                    <a href="javascript:;">Download</a>
                    <a href="javascript:;">Delete</a>
                  </td>
                </tr>
              </tbody>
             </table>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
          <form ref="uploadFileForm" encType="multipart/form-data" style={{display: 'none'}}>
            <input ref="file" onChange={this.uploadFile} name="file" type="file" />
          </form>
          <Dialog ref="filename">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <div>
                <label>
                  Name:
                  <input type="text" />
                </label>
                <label>Save in:</label>
                <label>
                  <input type="radio" name="saveTarget" />
                  Values
                </label>
                <label>
                  <input type="radio" name="saveTarget" />
                  System file
                </label>
              </div>
            </div>
          </Dialog>
        </Dialog>
    );
  }
});

var FilesDialogWrap = React.createClass({
  show: function(data) {
    this.refs.filesDialog.show(data);
  },
  hide: function() {
    this.refs.filesDialog.hide();
  },
  shouldComponentUpdate: function() {
    return false;
  },
  render: function() {
    return <FilesDialog ref="filesDialog" />;
  }
});

module.exports = FilesDialogWrap;