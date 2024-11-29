import { useState, useCallback,useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [CharAllowed ,setCharAllowed] = useState(false)
  const [password, setPassword] =useState("")
  const passwordRef=useRef(null)
  const passwordGen = useCallback(() => {
  let pass =""
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str+="1234567890"
  if(CharAllowed) str+="!@#$%^&*()_+`-="
  for(let i=0;i <length;i++)
  {
   let char=Math.floor(Math.random()*str.length +1)
   pass += str.charAt(char)
  }
  setPassword(pass)
  },[length,numberAllowed,CharAllowed,setPassword]) //useCallback(fn,[dependencies])
  const CopyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)},[password])
  useEffect(()=>{passwordGen()},[length,numberAllowed,CharAllowed,passwordGen])

  return (
    <>
    <div className='w-full  max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text-white text-center  my-3  '>Password Generator</h1>
    <div className='flex mb-4 overflow-hidden shadow-lg rounded-lg '>
      <input 
      type="text"
      value={password}
      className='outline-none w-full px-3 py-1'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button onClick={CopyPasswordToClipboard} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
         type="range"
         min={6}
         max={100}
         value ={length}
         className='cursor-pointer'
         onChange={(e)=>{
           setLength(e.target.value)
         }}
          />
          <label>Length:{length}</label>
         
      </div>
      <div className='flex items-center gap-x-1'>
        <input
         type="checkbox" 
         defaultChecked={numberAllowed}
         id='numberInput'
         onChange={()=>{setNumberAllowed((prev)=>!prev);}}

         />
         <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
         type="checkbox" 
         defaultChecked={CharAllowed}
         id='charInput'
         onChange={()=>{setCharAllowed((prev)=>!prev)}}

         />
         <label htmlFor="charInput">Characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
