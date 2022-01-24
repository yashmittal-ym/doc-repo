import React, { useState } from "react";
import "./form.css";
import fire from './firebase';
import { Oval } from  'react-loader-spinner'

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    url: ""
  });
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
                  ["url"]: docUrl
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

  const { firstName, lastName, email, password } = formData;

  const handleSubmit = async(e) => {
      e.preventDefault();
    const { firstName, lastName, email, password, url } = formData;
      const res = fetch('https://parabolic-rhino-338919-default-rtdb.firebaseio.com/userData.json',
          {
              method: "POST",
              headers: {
                  "content-type": "application/json",
              },
              body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                url
              }),
          });
          if(res){
              alert("data stored");
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                url: ""
              });
              imageInputRef.current.value = "";
          } else {
              alert("something went wrong");
          }
      

  };

  return (
    <form>
      <input
        value={firstName}
        onChange={e => updateFormData(e)}
        placeholder="First name"
        type="text"
        name="firstName"
        required
      />
      <input
        value={lastName}
        onChange={e => updateFormData(e)}
        placeholder="Last name"
        type="text"
        name="lastName"
        required
      />
      <input
        value={email}
        onChange={e => updateFormData(e)}
        placeholder="Email address"
        type="email"
        name="email"
        required
      />
      <input
        value={password}
        onChange={e => updateFormData(e)}
        placeholder="Password"
        type="password"
        name="password"
        required
      />
      <input
        type="file"
        onChange={onChange}
        required
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
      <button type="submit" disabled={uploading} onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default Form;
