import React, { useState } from "react"
import Flex from "./Components/Flex"
import Container from "./Components/Container"

function App() {
  let [textOne, setTextOne] = useState("")
  let [textTwo, setTextTwo] = useState("")

  let [todo, setTodo] = useState([])
  let [edit, setEdit] = useState(false)

  let [updateIndex, setUpdateIndex] = useState("")
  let [invalid, setInvalid] = useState(false)
  let [noPost , setNoPost] = useState(true)


  let handleChangeOne = (e) => {
    setTextOne(e.target.value)
  };

  let handleChangeTwo = (e) => {
    setTextTwo(e.target.value)
  };

  let handlePost = () => {
    let arr = [...todo]

    if (textOne && textTwo) {
      arr.push({
        name: textOne,
        des: textTwo,
      });
      setTodo(arr);
      setTextOne("");
      setTextTwo("");
      if(arr.length>0){
        setNoPost(false)
        setInvalid(false)
      }   
    }else{
      setInvalid(true)
    }
  };

  let handleDelete = (id) => {
    let arr = [...todo];
    arr.splice(id, 1);
    setTodo(arr);
    if(arr.length==0){
      setNoPost(true)
      setInvalid(false)
    }
   
  };

  let handleEdit = (text, id) => {
    setTextOne(text.name);
    setTextTwo(text.des);
    setEdit(true);
    setUpdateIndex(id);
  }

  let handleUpdate = () => {
    let arr = [...todo];
    if (textOne && textTwo) {
      arr[updateIndex] = {
        name: textOne,
        des: textTwo,
      }
      setTodo(arr);
      setEdit(false);
      setTextOne("");
      setTextTwo("");
      setInvalid(false)
    }else{
      setInvalid(true)
    }
  };

  return (
    <div >
      <Container>
        <Flex className="justify-center">
          <div className="bg-cyan-500 shadow-lg  w-[700px] p-10 mb-[40px] mt-5">
            <Flex>
              <div>
                <h1 className="text-center text-5xl font-bold text-black font-nunito mb-5">Todo App</h1>

                <div className="mb-5 w-[550px]">
                  <label className="text-balck font-sans"> Name    :  </label>
                  <input type="text" onChange={handleChangeOne} value={textOne}   placeholder="Please enter your name" className="py-[10px]  pl-[15px] w-[80%] placeholder:italic placeholder:pl-[20px] ml-[53px]"/>
                </div>

                <div className="mb-5 w-[550px] relative">

                  <label className="text-black font-sans">Description : </label>
                  <input type="text" onChange={handleChangeTwo} value={textTwo} placeholder="Please enter your Description" className="pl-[15px]  placeholder:italic placeholder:pl-[20px] py-[10px]  w-[80%] ml-[14px]" />
                  {invalid && <p className="text-[red] font-nunito font-bold  absolute top-[7px] right-[8px]"> invalid !</p>}
                
                </div>

                <Flex className="justify-center">

                  <div>
                    {edit ? (
                      <button className="bg-[#333CFF] py-[10px] text-lg font-nunito font-normal text-white px-[30px]" onClick={handleUpdate}>Update</button>
                    ) : (
                      <button className="bg-[#333CFF] py-[10px] text-lg font-nunito  font-normal text-white px-[30px]" onClick={handlePost}>Post</button>
                    )}
                  </div>

                </Flex>
              </div>
            </Flex>
          </div>
        </Flex>
        <p>
          
          {
             noPost 
             ?
             <h1 className="text-7xl text-white font-nunito font-semibold">No Post</h1> 
             : ""
          }
          </p>

        
      <Flex className="gap-5 flex-wrap ">
          {todo.map((item, index) => (
             <div key={index} className="bg-cyan-500 shadow-lg  w-[240px] p-5 ">  
                  <h1 className="text-5xl text-[black] font-nunito">{item.name}</h1>
                  <p className="text-base text-[black] my-[15px] font-paprika">{item.des}</p>
                  <Flex className="gap-4">
                  <button className="py-[10px] px-[20px] font-normal font-nunito bg-[green] rounded-sm text-white" onClick={() =>{handleEdit(item, index);}}>Edit</button>
                  <button className="py-[10px] px-[20px] font-normal  font-nunito bg-[red] rounded-sm text-white" onClick={() =>{handleDelete(index);}}>Delete</button>
                  </Flex>  
            </div>
          ))}
      </Flex>
      
      </Container>
    </div>
  );
}

export default App;