import { toast } from 'react-toastify'
import Spinner from '../reusable/Spinner'
import Calendar from '../reusable/Calendar'
import { IUser } from '../../types/user.type'
import { Button, Modal } from 'react-bootstrap'
import React, { useMemo, useState } from 'react'
import EditProfileCover from './EditProfileCover.profile'
import updateProfileJson from '../../jsons/updateProfile.json'

import { useUplaodPhotoMutation } from '../../store/services/upload.service'
import { useUpdateUserMutation } from '../../store/services/users.services'

interface Iprops {
   user: IUser
   show: boolean
   handleClose: () => void
}

export interface IDateOfBirth {
   day: number | null
   year: number | null
   month: string | null
}

const EditProfileModel = ({ user, handleClose, show }: Iprops) => {
   const [avatar, setAvatar] = useState<string>('')
   const [cover, setCover] = useState<string>('')
   const [uploadPhoto, { isLoading: uploadLoading }] = useUplaodPhotoMutation()

   const [updateUser, { data, isLoading }] = useUpdateUserMutation()

   const isUserUpdated = useMemo(() => {
      return data && data.user
   }, [data])

   const [dateOfBirth, setDateOfBirth] = useState<IDateOfBirth>({
      month: null,
      day: null,
      year: null,
   })

   const handleDateOfBirth = (date: IDateOfBirth) => setDateOfBirth(date)

   const handleAvatarAndCover = ({ state, file }: any) => {
      if (state === 'avatar') return setAvatar(file)
      if (state === 'cover') setCover(file)
   }

   const [inputFormData, setInputFormData] = useState<Partial<IUser>>({
      bio: user.bio || '',
      name: user.name || '',
      website: user.website || '',
      location: user.location || '',
   })

   const handleSubmit = async () => {
      const data: Partial<IUser> = {
         ...inputFormData,
      }

      const dateOfBirthIsEmpty = Object.values(dateOfBirth).some((value) => value !== null)
      const allFieldsAreEmpty = Object.values(dateOfBirth).every((value) => value !== null)

      if (dateOfBirthIsEmpty && !allFieldsAreEmpty) {
         toast.error('Please fill all fields of date of birth')
         return
      } else if (dateOfBirthIsEmpty) {
         data.date_Of_birth = `${dateOfBirth.month}/${dateOfBirth.day}/${dateOfBirth.year}`
      }

      if (avatar) {
         const photoData: any = await uploadPhoto(avatar)
         photoData && (data.avatar = photoData?.data.src as string)
         setAvatar('')
      }

      if (cover) {
         const photoData: any = await uploadPhoto(cover)
         photoData && (data.cover = photoData?.data.src as string)
         setCover('')
      }

      updateUser(data)
   }

   React.useEffect(() => {
      if (isUserUpdated) {
         handleClose()
         toast.success('Profile updated successfully')
      }
   }, [isUserUpdated])

   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <EditProfileCover handleAvatar={handleAvatarAndCover} user={user} />
            {updateProfileJson &&
               updateProfileJson.map((item: any, index: number) => {
                  return (
                     <div className="mb-3 mt-4" key={index}>
                        <label htmlFor={item.name} className="form-label">
                           {item.placeholder}
                        </label>
                        {item.type == 'textarea' ? (
                           <textarea
                              className="form-control"
                              id={item.name}
                              rows={5}
                              value={inputFormData[item.name as keyof IUser] as string}
                              onChange={(e) => {
                                 setInputFormData({
                                    ...inputFormData,
                                    [item.name]: e.target.value,
                                 })
                              }}></textarea>
                        ) : (
                           <input
                              type={item.type}
                              className="form-control bg-white"
                              id={item.name}
                              value={inputFormData[item.name as keyof IUser] as string}
                              onChange={(e) => {
                                 setInputFormData({
                                    ...inputFormData,
                                    [item.name]: e.target.value,
                                 })
                              }}
                           />
                        )}
                     </div>
                  )
               })}

            <div className="mb-3">
               <label htmlFor="" className="form-label mb-3">
                  Date of birth
               </label>
               <Calendar handleDateOfBirth={handleDateOfBirth} />
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Close
            </Button>
            <Button variant="dark" onClick={handleSubmit} disabled={isLoading || uploadLoading}>
               {isLoading || uploadLoading ? <Spinner size="sm" /> : 'Save changes'}
            </Button>
         </Modal.Footer>
      </Modal>
   )
}

export default EditProfileModel
