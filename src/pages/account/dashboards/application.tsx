import { StudentApplication } from '@/components/Card/StudentApplication'
import { useAccountType } from '@/hooks/useAccountType'
import React from 'react'
import TeacherApplication from '../TeacherApplication'

 const Application = () => {
  const {AccountType}=useAccountType()
  return (
    <div className='p-5'>
      {AccountType=="student" &&  <StudentApplication/>}
      {AccountType=="teacher" &&  <TeacherApplication /> }
   
    
    </div> 
  )
}

export default Application 