import React, { Component
}     from 'react';
import { Upload, Icon, Modal, Button } from 'antd';
import axios from 'axios'


export default class Imagenes extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    uploading: false,
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileListPreview: fileList })   
  }
  handleUpload = () => {
    const { fileList } = this.state;
    // this.setState({
    //   uploading: true,
    // });
    this.props.imagenes(fileList)
    this.props.actualizaCurrent(2, this.state.fileListPreview)

  }
  render() {
    const { previewVisible, previewImage, fileList, uploading, fileListPreview } = this.state;
    const props = {
      action: 'http://localhost:8080/x/v1/pla/plan',
      listType:"picture-card",
      multiple:true,
 
      onPreview:(e)=>{this.handlePreview(e)},
      onChange: (e)=>{this.handleChange(e)},
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: fileListPreview,
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Subir</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload  {...props}
      >
        {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Button
          style={{position:'absolute', right: '28px'}}
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
          loading={uploading}
        >
          {uploading ? 'Subiendo' : 'Subir y continuar' }
        </Button>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
         
      </div>
    );
  }
}