import React , {useState , useEffect , forwardRef } from 'react';
import { useRef } from 'react';
import BoardDelete from '../BoardDelete';




export default function ({data , setData ,formAppear , setFormAppear }) {
    const [boardObj , setBoardObj] = useState( { name: "" , columns : [
        {name: "", tasks: []}
         ,{name: "", tasks: []}
    ]})
    const [colFields , setColFields] = useState([
        {value : '' , error : ''},
        {value : '' , error : ''}
    ])
    const [formErrors, setFormErrors] = useState({});
    const boardRef = useRef(null)
    useEffect(() => {
        function outsideClick(event) {
          if (boardRef.current && !boardRef.current.contains(event.target)) {
            setFormAppear(prev => {
                return {
                    ...prev,
                    board: false,
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

    function titleHandle(e) {
        const {name , value} = e.target
        setBoardObj((prev) => {
            return {
                ...prev , 
                [name] : value
            }
        })
    }

    const handleAddBoard = (e, index ) => {
        const columns = [...boardObj.columns];
        columns[index].name = e.target.value;
        setBoardObj( prev => {
            return (
                {
                ...prev,
                columns }
            )

            } )  
         };

                const handleSumbit = (e)=> {
                    e.preventDefault();
                    const errors = validate();
                    if (Object.keys(errors).length === 0) {
                        setData(prev => {
                            return [
                                ...prev,
                                boardObj
                            ]
                        });
                        setFormAppear(prev => {
                            return {
                                ...prev,
                                board: false,
                                overlay: false
                            }
                        });
                    } else {
                        setFormErrors(errors);
                    }
                }

const validate = () => {
    const errors = {};
    if (!boardObj.name) {
      errors.name = "Can\'t be empty";
      errors.nameError = true
    }
    boardObj.columns.forEach((col , index) => {
        if(!col.name) {
            errors[`col-${index}`] = 'Can\'t be empty'
            errors[`err-${index}`] = true
        }
    })
    return errors;
};

    function revomveCol () {
        if(colFields.length <= 2){
            return 
        }else{
            setColFields(prevState => {
                const updatedFields = [...prevState];
                updatedFields.pop();
                return [...updatedFields]
            });
        }
    }
    function addCol(){
        const newCol = {value : '' , error : ''}
        const newBoardCol = {name: "", tasks: []}
        setColFields((prev) => {
            return [
                ...prev ,
                newCol
        ]
        })
        setBoardObj((prev) => {
            return {
                ...prev ,
                columns : [...prev.columns , newBoardCol]
            }
        })
    }
  return (
         <div className='add-new board transition' ref={boardRef} >
        <h1>Add New Board</h1>
        <form>
            <div className={`f-tit ${formErrors.nameError && `error`}`}>
                <label htmlFor="title">Title</label>
                <input type="text" name='name' id='title' placeholder='e.g. Take coffee break'  onChange={titleHandle}/>
                <p>{formErrors.name && formErrors.name}</p>
            </div>
            <div className='f-sub'>
                <label >Columns</label>
                <div className='sub-styles'>
                {colFields && colFields.map((col , index) => {
                    return (
                        <div key={index} className={`sub-${index} ${formErrors[`err-${index}`] && `error`}`} id={index}>
                        <input type="text" id={index}  placeholder={`e.g. Col-${index + 1} `}  onChange={(e) => handleAddBoard(e, index)}  />
                        <svg onClick={revomveCol } width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g  fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                        <p> {formErrors[`col-${index}`] && formErrors[`col-${index}`]}</p>
                    </div>
                    )
                })}
                </div>
                <button type='button' onClick={addCol}> + Add New Column</button>
            </div>

            <button type='button' onClick={handleSumbit}>Create New Board</button>
        </form>
    </div>
  )
}
