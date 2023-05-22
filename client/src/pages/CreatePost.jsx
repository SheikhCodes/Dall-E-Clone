import React, { useState } from "react";
import { getRandomPrompt } from "../assets/utils";
import { json, useNavigate } from "react-router-dom";
import { preview } from "../assets";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo){
      setloading(true);
      
      try {

        const response=await fetch('http://localhost:8080/api/v1/post',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          
          body:JSON.stringify(form),
        })
        await response.json();
        console.log(form)
        navigate('/')
        
      } catch (err) {
        alert(err)
      }
      finally{
        setloading(false)
      }

    }
    else{
      alert('please enter a prompt and generate the image')
    }


  };
  const handleChange = (e) => {
    setform({...form,[e.target.name]:e.target.value})

  };
  const  generateImg = async() => {

    if(form.prompt){
      try{
          setgeneratingImg(true);
          const response=await fetch('http://localhost:8080/api/v1/dalle',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({prompt:form.prompt}),
          })
          const data=await response.json();
          console.log(data)
          setform({...form,photo:`data:image/jpeg;base64,${data.photo}`})
          console.log(form)
      }catch(err){
        alert(err)

      }
      finally{
        setgeneratingImg(false)
      }
    }
    else{
      alert("please enter a prompt")
    }


  };
  const handleSurpriseMe = () => {
        const randomPrompt=getRandomPrompt(form.prompt);
        setform({...form,prompt:randomPrompt})

  };

  const [loading, setloading] = useState(false);
  const [generatingImg, setgeneratingImg] = useState(false);
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text=[#222328] text-[32px]">
          Imagine and Create
        </h1>
        <p className="mt-2 text=[#666e75 text-[16px] max-w[500px]">
          Create imaginative and visually stunning images through DALLI-E AI
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A fortune-telling shiba inu reading your fate in a giant hamburger, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div
            className="relative bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500
                            w-64 p-3 h-64 flex justify-center items-center"
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt={preview}
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt5 flex gap-5">
            <button type="button" onClick={generateImg} className="text-white bg-purple-500 font-medium rounded-md
             text-sm w-full sm:w-auto px-5 py-2.5" >
                {generatingImg?'Generating...':'Generate'}

            </button>
        </div>
        <div className="mt-10">
            <p className="mt-2 text-[#666e74] text-[14px]">Once you have created the image you want, you can share it with others in the community</p>
            
            <button type="submit" className="mt-3 text-white bg-[#6469ff]
            font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              {loading?'Sharing...':'Share with the Community'}  
            </button>
          
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
