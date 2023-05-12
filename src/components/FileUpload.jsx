import axios from 'axios';
import { useState } from 'react';

function FileUpload() {
    const URL = process.env.REACT_APP_URL;
    const [dataObject, setDataObject] = useState({});
    const[input, setInput] = useState({
        path: "",
    })

    const handleChange = (e) => {
        const{name, value} = e.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    ;}

    const uploadFile = async () => {
        try{
            await axios.post(URL, dataObject)
            .then((res) => {
                console.log("Here is the response: ", res);

            })
        } catch(error){
            console.log(error)
        }
    }
  return (
    <div style={{
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center', 
        width:'50%', 
        minWidth:'550px',
        maxWidth:'800px',
        height:'40vh',
        minHeight:'400px', 
        maxHeight: '600px',
        // border:'1px solid',
        margin:'30px'
        }}>
        <div style={{
            display:'flex', 
            justifyContent:'space-between', 
            flexDirection:'column', 
            alignItems:'center',
            maxHeight:'400px',
            // minHeight:'200px',
            height:'70%',
            width:'80%',
            border:'1px solid',
            borderRadius: '15px',
            paddingBottom:'30px',
            boxShadow: '5px 5px 5px rgba(200, 200, 200, .5)'
            }}>
            <h2 style={{color:'grey'}}>Upload .xml file To S3 Bucket</h2>
            <span style={{fontWeight:'400', fontSize:'25px'}}>S3 Bucket URL: </span>
            {/* <p>{input.path}</p> */}
            <input style={{padding:'15px', fontSize:'16px', textAlign:'center', width:'85%'}} name='path' type='text' placeholder='upload path' value={input.path} onChange={handleChange}/>
            <div style={{
                display:'flex',
                justifyContent:'center',
                width:'90%'
            }}>
                <input type="file" style={{fontSize:'20px', padding:'10px'}} onChange={(e) => {
                    // current uploaded file
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    // when file is loaded
                    reader.onload = (e) => {
                        // get base64 encoded file
                        // example: "data:text/xml;base64,ESCKkilahe1"
                        const path = e.target.result;
                        // split into ["data:text/xml", "base64,EACASETXXAAET..."]
                        const segments = path.split(';');
                        // extract "text/xml"
                        const mime = segments[0].split(':')[1];
                        // extract the base64 encoded data ONLY. 
                        // splits into ["base64", "SEACSEiXAE..."] for example
                        const data = segments[1].split(',')[1];
                        // get the file name
                        const name = file.name;
                        setDataObject({
                            mime,
                            name,
                            xml: data,
                        })
                    }
                    reader.readAsDataURL(file);
                    setInput({ path: URL })
                }} />
                <button style={{fontSize:'20px', padding:'10px'}} onClick={uploadFile}>upload file</button>
            </div>
        </div>
    </div>
  );
}

export default FileUpload;
