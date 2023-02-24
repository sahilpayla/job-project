import React from 'react'

const CategoryForm = ({hanleSubmit, value, setValue}) => {
   return (
      <>
         <form onSubmit={hanleSubmit} >
            <div className="mb-3">
               <input type="text" className='form-control' placeholder='Enter new category'
                  value={value} 
                  onChange={(e)=> setValue(e.target.value)} />
            </div>

            <button type='submit' className='btn btn-primary'>Submit</button>
         </form>
      </>
   )
}

export default CategoryForm