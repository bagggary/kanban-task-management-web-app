import React  , {useState , useRef , useEffect}from 'react'
import darkLogo from '/src/assets/icons/logo-dark.svg'
import lightLogo from '/src/assets/icons/logo-light.svg'
import mobileLogo from '/src/assets/icons/logo-mobile.svg'
import EditBoard from './Forms/EditBoard'
import AddTask from './Forms/AddTask'
import BoardDelete from './BoardDelete'
import { useTheme } from './ThemeContext'

export default function Navbar({openNav , 
    toggleNav ,
    handleBoard ,
    selectBoard , 
    data ,
    formAppear ,
    setFormAppear ,
    setData ,
    setSelectedBoard
})
    {
    const [open , setOpen ] = useState(false) ; 
    const optionsRef = useRef(null) 
    const { theme, toggleTheme } = useTheme();
    useEffect(() => {
        function outsideClick(event) {
          if (optionsRef.current && !optionsRef.current.contains(event.target) ) {
            setFormAppear(prev => {
                return {
                    ...prev,
                    boardOptions : false
                }
            });
          }
        }
        document.addEventListener('mousedown', outsideClick);
        return () => {
          document.removeEventListener('mousedown', outsideClick);
        };
      }, [optionsRef]);
    function handleDropdown(){
        setOpen(prev => !prev)
    }

    function boardHandle(){
        setFormAppear((prev) => {
            return {
                ...prev ,
               board: true ,
               overlay : true
    
            }
        })
        setOpen(false) 
    }
    function handleEditBoard (){
        setFormAppear((prev) => {
            return {
                ...prev , 
                editBoard : true ,
                overlay :  true 
            }
        })
    }
    function handleDeleteBoard (){
        setFormAppear((prev) => {
            return {
                ...prev , 
                deleteBoard : true ,
                overlay :  true 
            }
        })
    }
    function handleTask (){
        setFormAppear((prev) => {
            return {
                ...prev ,
                task : true ,
                overlay : true 
            }
        })
    }
        const HandleBoardOptions = () => {
            setFormAppear((prev) => {
                return {
                    ...prev , 
                    boardOptions : true ,
                }
            })
        }
        function handleAddingTask(){
            setFormAppear(prev => {
                return {
                    ...prev , 
                    task : true ,
                    overlay: true 
                }
            })
        }
        const handleToggle = () => {
            toggleTheme();
          };
return (
    <>
    <header className='transition'>
        <div className="container">
    <nav> 
        <div className={`logo-larger transition ${openNav ? 'logo-screen' : ''}`}>
            <img src={theme === "light" ? darkLogo : lightLogo} alt="larger-logo" />
        </div>
        <div className="container">
             <div className='left'>
                        <div className="logo">
                            <picture>
                                        <img 
                                            src={mobileLogo}
                                            alt="logo"
                                        />
                            </picture>
                        </div>
                        <div className="left__larger">
                            { data && (data[selectBoard].name).toString()}
              </div>
                        <div className="dropdown">
                            <div className='dropdown__name' onClick={handleDropdown}>
                                { data && (data[selectBoard].name).toString()}
                                <span className={`${open ? 'rot' : ''}`}>
                                <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4"/></svg>
                                </span>
                            </div>
                            <div className={` dropdown__options ${open ? 'open' : ''}` } >
                                <div className="dropdown__options__boards">
                            <h2> ALL BOARDS ({data[selectBoard].columns.length})</h2>  
                                <ul>
                                    { data && data.map((board , index) => {
                                        return (            
                                            <li className={selectBoard == index ? 'active' : ''} onClick = {handleBoard} id = {index} key = {index}>
                                       <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                                        <div>{board.name}</div>
                                    </li>
                                                )
                                        })
                                    }
                                </ul>
                                    <div className="dropdown__create">
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/></svg>
                                            <div onClick={boardHandle}><span>+</span>Create New Board</div>
                                    </div>
                                    </div>
                                    <div className='dropdown__switch'>
                                        <div className="light-icon">
                                        <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg"><path d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z" /></svg>
                                        </div>
                                        <div className="toggle">
                                            <input type="checkbox" id="toggle" checked={theme === 'dark'} onChange={handleToggle}/>
                                            <label htmlFor="toggle"></label>
                                        </div>
                                        <div className="dark-icon">
                                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z" /></svg>
                                 </div>
                                    </div>
                            </div>
                        </div>
              </div>
              <div className="right">
                <div className="add-task" onClick={handleAddingTask}>
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg>
                </div>
                <div className="add-task-larger" onClick={handleTask}>
                    <span><svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg></span> Add New Task
                </div>
                <div onClick={HandleBoardOptions} className='ellipsis' ref ={optionsRef}>
                <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                 <div className={`ellipsis-options ${formAppear.boardOptions ? 'show' : 'hide'}`}  >
                    <div onClick={handleEditBoard}>Edit Board</div>
                    <div onClick={handleDeleteBoard}>Delete Board</div>
                </div>
                </div>
              </div>
        </div>
    </nav>
    </div>
    <div className='side-toggle' onClick={toggleNav} style = {{display : openNav ? "none" : 'flex'}}>
    <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z" /></svg>
    </div>
    </header>
    { formAppear.editBoard &&  <EditBoard 
    selectBoard = {selectBoard} 
    formAppear = {formAppear} 
    data = {data}
    setData = {setData}
    setFormAppear = {setFormAppear}
    /> }
    {
        formAppear.deleteBoard && <BoardDelete 
        selectBoard = {selectBoard}
        data = {data}
        setData = {setData}
        setFormAppear = {setFormAppear}
        setSelectedBoard = {setSelectedBoard}
        />
    }
    { formAppear.task && <AddTask 
    selectBoard = {selectBoard} 
    formAppear = {formAppear} 
    data = {data}
    setData = {setData}
    setFormAppear = {setFormAppear}
    />
    }
    </>
)

}
