import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const manager = () => {
    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getpasswords = async () => {
      let req = await fetch("http://localhost:3000/");
      
        let passwords = await req.json();

        if (passwords.length == 0){
            setpasswordArray([]);
            console.log(passwords);
            return;
        }
        else{

            setpasswordArray(passwords);
              console.log(passwords);
        }


      
    }
    
    
    useEffect(() => {

        getpasswords();



    }, [])


    const savepassword = async () => {
        console.log(form);
        if (form.site.length == 0 || form.password.length == 0 || form.username.length == 0) {
            alert("error");
            return;
        }
        console.log([...passwordArray,{...form,id : uuidv4()}]);

        //  await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

        
        setpasswordArray([...passwordArray, {...form,id : uuidv4()}]);


        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })


        // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form,id : uuidv4()}]))



        toast('Password Saved!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        // setform({site : "",username: "",password: ""});
    }
    const deletePassword = async(id) => {
       console.log("deleting password with id "  + id);
       setpasswordArray(passwordArray.filter(item => item.id != id));
       
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })


       toast('Password deleted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const editPassword = (id) => {
       console.log("editing password with id "  + id);
       setform(passwordArray.filter(i => i.id === id)[0]);
        setpasswordArray(passwordArray.filter(item => item.id != id));
       localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item => item.id != id)));

    }

    const showpassword = () => {

        if (ref.current.src.includes("icons/eye-cross.png")) {
            ref.current.src = "icons/eye.png";
            ref.current.className = ""
            passref.current.type = "text"

        }
        else {
            ref.current.src = "icons/eye-cross.png"
            ref.current.className = "w-6 h-6";
            passref.current.type = "password"

        }
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    }




    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
           <div className="fixed inset-0 -z-10 min-h-screen w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

            <div className='p-3 md:mycontainer min-h-[88.2vh]'>

                <h1 className='text-4xl text-font-bold text-center py-2'>
                    <span> &lt;</span>
                    <span>PASS</span>
                    <span>OP/&gt;</span>
                </h1>
                <p className='text-center'>Your Own Password Manager</p>


                <div className='text-white flex flex-col p-4 gap-2'>
                    <input value={form.site} onChange={handlechange} placeholder="Enter Website URL" type="text" className='bg-white rounded-2xl text-black px-4 py-1 border-2' name="site" id="" />
                    <div className='flex flex-col md:flex-row gap-2'>
                        <input value={form.username} onChange={handlechange} placeholder="Enter Username" type="text" className='  bg-white rounded-2xl w-full text-black px-4 border-2 py-1' name="username" />

                        <div className='relative'>

                            <input ref={passref} value={form.password} type="password" onChange={handlechange} placeholder="Enter Password" className="px-4 py-1 bg-white  border-2 rounded-2xl w-full text-black " name="password" />


                            <span className='text-black absolute right-2 py-1.5 cursor-pointer' onClick={showpassword}>
                                <img ref={ref} src="icons/eye.png" alt="eye" />
                            </span>

                        </div>




                    </div>

                    <button onClick={savepassword} className=" bg-purple-400 cursor-pointer  mx-auto flex justify-center items-center  gap-2 rounded-full px-2 py-2 w-fit">
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover">
                        </lord-icon>
                        <span className="text-black">ADD PASSWORD</span>
                    </button>


                </div>

                <div className='passwords mx-2'>
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No Passwords to show </div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-xl overflow-hidden mb-2">
                            <thead className='bg-green-700 mx-auto'>
                                <tr>
                                    <th className='py-2'>Site </th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="py-2 border-amber-50 text-center">
                                                <div className="flex items-center justify-center cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                    <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        {item.site}
                                                    </a>
                                                    <img
                                                        className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
                                                        src="/icons/copy.svg"
                                                        alt="copy"
                                                    />
                                                </div>
                                            </td>

                                            <td className='py-2  border-amber-50 text-center '>
                                                <div className="flex items-center justify-center gap-1 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                    <span>{item.username}</span>
                                                    <img
                                                        className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
                                                        src="/icons/copy.svg"
                                                        alt="copy"
                                                    />
                                                </div>

                                            </td>
                                            <td className='py-2  border-amber-50 text-center'>


                                                <div className="flex items-center justify-center cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                    <span>{item.password}</span>
                                                    <img
                                                        className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
                                                        src="/icons/copy.svg"
                                                        alt="copy"
                                                    />
                                                </div>

                                            </td>
                                            <td className='py-2  border-amber-50 text-center'>


                                                <div className='flex justify-center items-center'>

                                                    <span onClick={() => {editPassword(item.id)}}><lord-icon
                                                        src="https://cdn.lordicon.com/exymduqj.json"
                                                        trigger="hover"
                                                         style = {{"width":"25px","height":"25px","cursor": "pointer"}}>
                                                    </lord-icon></span>
                                                    <span onClick={() => {deletePassword(item.id)}}><lord-icon
                                                        src="https://cdn.lordicon.com/jzinekkv.json"
                                                        trigger="hover"
                                                        style = {{"width":"25px","height":"25px","cursor": "pointer"}}>
                                                    </lord-icon></span>
                                                </div>

                                            </td>
                                        </tr>)


                                })}

                            </tbody>
                        </table>
                    }

                </div>
            </div>

        </>
    )
}

export default manager