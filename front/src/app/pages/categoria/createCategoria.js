import React, { Component
}     from 'react';
import { Modal, Button, Form, Input, Icon, Upload } from 'antd';
const FormItem = Form.Item;

class CrearCategoria extends React.Component {
	state = {
		previewVisible: false,
		previewImage: '',
		nombre: '',
		fileList: [],
		uploading: false,
	}


	//////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////    CANCELO LA PREVIEW
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	handleCancel = () => this.setState({ previewVisible: false })

	//////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////    GENERO EL PREVIEW
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////    GENERO EL PREVIEW
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	handleChange = ({ fileList }) => {
		this.setState({ fileListPreview: fileList })   
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////    RENDERIZO EL FORMULARIO
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	handleUpload = () => {
		const { fileList, nombre } = this.state;
		console.log(fileList)
		this.props.handleSubmit(fileList, nombre)
		this.props.close()
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////    RENDERIZO EL FORMULARIO
	//////////////////////////////////////////////////////////////////////////////////////////////////////
  	renderForm(){
	   const { getFieldDecorator, validateFields } = this.props.form;
	   const {  previewVisible, previewImage, fileList, uploading, fileListPreview, nombre } = this.state
	   const props = {
	      action: 'http://localhost:8080/x/v1/pla/plan',
	      listType:"picture-card",
	      multiple:false,
	 
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

	   return(
			<Form onSubmit={this.handleSubmit} className="login-form">
			{/* NOMBRE */}
				<Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{ margin:'20px 0' }} placeholder="Nombre" onChange={(e)=>this.setState({nombre:e.target.value})} /> 

			{/* IMAGEN */}
				<div className="clearfix">
		        	<Upload  {...props}>
		      		{fileList.length >= 1 ? null : uploadButton}
		        	</Upload>
		        	<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
		         	<img alt="example" style={{ width: '100%' }} src={previewImage} />
		        	</Modal>
		      </div>

		   {/* GUARDAR */}
				<div style={{textAlign:'right'}}>
					<Button
		          className="upload-demo-start"
		          type="primary"
		          onClick={this.handleUpload}
		          disabled={this.state.fileList.length === 0 || nombre.length===0}
		          loading={uploading} 
		        >
		         {uploading ? 'Subiendo' : 'Guardar' }
		        </Button>
				</div>
			</Form>
   	)
   }


  render() {
    const {confirmLoading, ModalTitle } = this.state;
    return (
      <div>
        <Modal title={ModalTitle}
          visible={this.props.showModal}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={()=>this.props.close(false)}
          footer={null}
          width={400}
        >
        {this.renderForm()}
        </Modal>
      </div>
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////    ENVIO LA INFORMACION DEL FORMULARIO
  /////////////////////////////////////////////////////////////////////////////////////////////
  handleSubmit = (e) => {
    const {restricciones, categorias, ubicacion, x} = this.state
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.handleSubmit(values, restricciones, categorias, ubicacion, x)
          this.setState({ current:1 });
        }
      });
  }

	/////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////    CIERRO EL MODAL
	/////////////////////////////////////////////////////////////////////////////////////////////
	finalizar = () =>{
		this.setState({
			ModalTitle: 'Creando Plan...',
			guardarBtn: 'Guardando...',
			loading: true,
		});
		setTimeout(() => {
			this.props.close(false)
			location.reload();
		}, 2000);
	}

}

export default Form.create()(CrearCategoria);