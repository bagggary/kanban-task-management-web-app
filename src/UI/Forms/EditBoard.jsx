import React, { useState , useEffect , useRef } from 'react'

export default function EditBoard ({ data , selectBoard , setData , setFormAppear }) {
    const [dataState , setDataState] = useState(null)
    const [formErrors, setFormErrors] = useState({});
    const boardRef = useRef(null)
    useEffect(() => {
        function outsideClick(event) {
          if (boardRef.current && !boardRef.current.contains(event.target)) {
            setFormAppear(prev => {
                return {
                    ...prev,
                    editBoard: false,
                    overlay: false
                }
            });
          }
        }
        document.addEventListener('mousedown', outsideClick);
        return () => {
          document.removeEventListener('mousedown', outsideClick);
        };
      }, [boardRef]); 

    useEffect(()=> {
        setDataState(data[selectBoard])
    } , [data])

    function removeSub(id){
        if(dataState.columns.length <= 2){
            return 
        }
        const newColumnsData = [...dataState.columns];
        newColumnsData.splice(id, 1);
        setDataState(prev => {
            return {
                ...prev ,
                columns : newColumnsData
            }
        });
    }
    function addCol(){
        const newBoardCol = {name: "", tasks: []}
        setDataState(prev => {
            return {
                ...prev ,
                columns : [...prev.columns , newBoardCol]
            }
        });
    }
    const handleSumbit = (e)=> {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            setData((prev) => {
                const newDataState = [...prev]
                newDataState[selectBoard] = dataState
                return newDataState
            });
            setFormAppear(prev => {
                return {
                    ...prev,
                    overlay: false ,
                    editBoard : false
                }
            });
        } else {
            setFormErrors(errors);
        }
    }

    const handleAddBoard = (e, index ) => {
        const columns = [...dataState.columns];
        columns[index].name = e.target.value;
        setDataState( prev => {
            return (
                {
                ...prev,
                columns }
            )
            } )  
    }
         
    const validate = () => {
        const errors = {}
        if(!dataState.name) {
            errors.name = "can\'t be empty"
            errors.nameError = true
        }
        dataState.columns.forEach((col , index) => {
            if(!col.name) {
                errors[`col-${index}`] = 'Can\'t be empty'
                errors[`err-${index}`] = true
            }
        })
        return errors
    }
    function titleHandle(e) {
        setDataState((prev) => {
            return {
                ...prev , 
                name : e.target.value
            }
        })
    }

  return (
    <div className='add-new edit transition' ref={boardRef} >
         <h1>Edit Board</h1>
        <form>
            <div className={`f-tit ${formErrors.name && `error`}`}>
                <label htmlFor="title">BoardName</label>
                <input type="text" name='name' id='title' placeholder='e.g. Take coffee break'   value = {dataState && dataState.name} onChange = { titleHandle}/> 
                <p>{formErrors.name && formErrors.name}</p>
                 </div>
            <div className='f-sub'> 
                <label >BoardColumns</label>
                <div className='sub-styles'>
                {dataState && dataState.columns.map((col , index) => {
                    return (
                        <div key={index}  className={`sub-${index} ${formErrors[`err-${index}`] && `error`}`}id={index}>
                        <input type="text" id={index}  placeholder={`e.g. Col-${index + 1} `}  value = {col.name}  onChange = { (e) => handleAddBoard(e, index)} />
                        <svg onClick={(e) => removeSub(index) } width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g  fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                        <p> {formErrors[`col-${index}`] && formErrors[`col-${index}`]}</p>
                         </div>
                    )
                })}
                </div>
                <button type='button' onClick={addCol}> + Add New Column</button>
            </div>
            <button type='button' onClick={handleSumbit}>Save Changes</button>
        </form> 
    </div>
  )
}
