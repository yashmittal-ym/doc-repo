import React, { useState, useEffect } from "react";
import "./form.css";
import fire from './firebase';
import { Oval } from  'react-loader-spinner'
import Button from 'react-bootstrap/Button';
import {db} from './firebase';



const Form = ({
  editTitle,
  editDescription,
  editId,
  editUrl,
  editAction,
  editOnClick,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
  });
  useEffect(() => {
    if(editId){
      setFormData({
        title: editTitle,
        description: editDescription,
        url:editUrl,
      });
    }
  }, [])
  const imageInputRef = React.useRef();
  const [uploading, setUploading] = useState(false);

  const onChange = (e) => {
      setUploading(true);
      const file = e.target.files[0];
      const storageRef = fire.storage().ref()
      const fileRef = storageRef.child(file.name)
      fileRef.put(file).then(()=>{
            fileRef.getDownloadURL().then((docUrl)=>{
                setFormData({
                  ...formData,
                  [e.target.name]: docUrl
                });
            })
            setUploading(false);
      })  
  }

  const updateFormData = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const { title, description } = formData;

  const handleSubmit = async(e) => {
      e.preventDefault();
    const { title, description, url } = formData;
    if(title==="" || description===""){
      alert("Please fill all the fields");
      return;
    }
    if(editId){
      const tutorialsRef = db.ref('userData');
      console.log("userData:  ", editAction, editId, url);
      if(editAction==="update"){
        tutorialsRef.child(editId).set({
          title: title,
          description: description,
          url: url,
        });
      }
      editOnClick();
      setFormData({
        title: "",
        description: "",
        url: "",
      });
      
      return;
    }
    if(url===""){
      alert("Please upload the file");
      return;
    }
    var tutorialsRef = db.ref("/userData");
    tutorialsRef.push({
      title: title,
      description: description,
      url: url,
    });
    editOnClick();
  };

  return (
    <form>
      <input
        value={title}
        onChange={e => updateFormData(e)}
        placeholder="Add tilte..."
        type="text"
        name="title"
        required
      />
      <input
        value={description}
        onChange={e => updateFormData(e)}
        placeholder="Add description..."
        type="text"
        name="description"
        required
      />
      <input
        type="file"
        onChange={onChange}
        required
        name="url"
        ref={imageInputRef}
      />
      {
        uploading ? <Oval
        heigth="100"
        width="100"
        color='grey'
        ariaLabel='loading'
      />: <span/>
      }
      <Button type="submit" disabled={uploading} onClick={handleSubmit}>Submit</Button>
    </form>
  );
};

export default Form;
