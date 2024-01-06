import { StudentBatchesOngoing } from '@/components/Card/StudentBatchesOngoing'
import { StudentUpcomingClasses } from '@/components/Card/StudentUpcomingClasses'
import React from 'react'
import TeacherBatch from '../teacherBatch'

import { useAccountType } from '@/hooks/useAccountType'
import { StudentBatchesCompleted } from '@/components/Card/StudentBatchesCompleted'

 const Batches = () => {
  const {AccountType}=useAccountType()
  return (
    <div className='p-5'>

      {AccountType=="student" && <StudentBatchesOngoing />}
      {AccountType=="teacher" &&  <TeacherBatch /> }

    </div>
  )
}

export default Batches
