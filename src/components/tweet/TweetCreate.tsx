import Cookies from 'js-cookie'
import React, { useMemo } from 'react'
import { toast } from 'react-toastify'
import Avatar from '../reusable/Avatar'
import Spinner from '../reusable/Spinner'
import axios from '../../config/axios.config'
import stringUtils from '../../utils/string.utils'
import { useMeQuery } from '../../store/services/auth.services'
import { useAddTweetMutation } from '../../store/services/tweets.services'
import { useUplaodPhotoMutation } from '../../store/services/upload.service'

const TweetCreate = () => {
   const { data } = useMeQuery()
   const [uploadPhoto, { isLoading: uploadLoading }] = useUplaodPhotoMutation()
   const [addTweet, { isLoading: addTweetLoading }] = useAddTweetMutation()

   const currentUser = useMemo(() => data?.user, [data])

   const [content, setConent] = React.useState('')
   const [readableImage, setReadableImage] = React.useState<any>(null)
   const [imageForUpload, setImageForUpload] = React.useState<any>(null)
   const [isPublic, setIsPublic] = React.useState<boolean>(true)

   const handlePostImage = (e: any) => {
      const file = e.target.files[0]
      setImageForUpload(file)
      if (file) {
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = () => {
            setReadableImage(reader.result)
         }
      }
   }

   const handleCancelImage = () => {
      setReadableImage(null)
      setImageForUpload(null)
   }

   const uploadTrend = async (trend: any, tweetId: String) => {
      try {
         const response = await axios.post('/trend/add', {
            name: trend,
            tweetId,
         })
         const data = await response.data
         return data.trend._id
      } catch (error) {
         return error
      }
   }

   const uploadTweet = async () => {
      const userId = Cookies.get('user_Id')
      try {
         const formData: any = {
            content,
            is_Public: isPublic,
         }

         if (readableImage) {
            const photoData: any = await uploadPhoto(readableImage)
            photoData && (formData.photo = photoData?.data.src as string)
         }

         const response: any = await addTweet(formData)
         toast.success('Tweet posted successfully')

         setConent('')
         handleCancelImage()
         setIsPublic(true)

         if (stringUtils.extractTrends(content).length > 0) {
            const tweetId = response?.data.tweet._id as string
            console.log(tweetId)
            stringUtils.extractTrends(content).forEach(async (trend: any) => {
               await uploadTrend(trend, tweetId)
            })
         }
      } catch (error: any) {
         toast.error(error?.response.data.message)
      }
   }

   return (
      <section className="border-bottom px-md-4 px-1 pt-md-4 pt-1 pb-4 position-relative">
         <header className="d-flex  pb2 align-items-start">
            <div>
               <Avatar avatar={currentUser?.avatar} />
            </div>
            <div className="w-100 ms-1">
               <textarea
                  className="form-control border-0 fs-18 h-50px"
                  placeholder="What's happening?"
                  value={content}
                  onChange={(e) => setConent(e.target.value)}
                  maxLength={140}
                  style={{ resize: 'none' }}></textarea>
               {readableImage && (
                  <div className="position-relative">
                     <img
                        src={readableImage}
                        className="w-100 object-contain bg-secondary  h-md mt-4 rounded-3"
                        alt=""
                     />
                     <button
                        className="btn h-34px w-34px center bg-dark bg-opacity-25 text-white position-absolute start-9px top-28px"
                        onClick={handleCancelImage}>
                        <i className="fa-solid fa-xmark fs-16"></i>
                     </button>
                  </div>
               )}
               <footer className="d-flex justify-content-between align-items-center mt-4">
                  <section className="d-flex">
                     <label className="btn border center py-2 me-3">
                        <i className="fa-solid fs-19 fa-image"></i>
                        <input type="file" className="d-none" onChange={handlePostImage} />
                     </label>
                     <PostDropdown setIsPublic={setIsPublic} />
                  </section>
                  <button
                     className="btn btn-dark text-white px-4 text-dark py-2"
                     disabled={addTweetLoading || uploadLoading || (!imageForUpload && !content)}
                     onClick={uploadTweet}>
                     {addTweetLoading || uploadLoading ? <Spinner size="sm" /> : 'Tweet'}
                  </button>
               </footer>
            </div>
         </header>
         {addTweetLoading ||
            (uploadLoading && (
               <div className="position-absolute bg-secondary bg-opacity-10 h-100 w-100 top-0 start-0"></div>
            ))}
      </section>
   )
}

const PostDropdown = (props: any) => {
   const [value, setValue] = React.useState(0)

   interface Option {
      title: string
      icon: string
   }

   const options: Option[] = [
      {
         title: 'Public',
         icon: 'fa-solid fa-globe',
      },
      {
         title: 'Only Me',
         icon: 'fa-solid fa-lock',
      },
   ]
   const initialOptions = (option: Option) => (
      <div>
         <i className={`${option.icon} me-2`}></i>
         <span>{option.title}</span>
      </div>
   )

   const handleState = (index: number) => {
      setValue(index)
      props.setIsPublic(index === 0)
   }

   return (
      <div className="dropdown px-0">
         <button
            className="btn btn-outline-secondary text-dark dropdown-toggle pe-5"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            {initialOptions(options[value])}
         </button>
         <ul className="dropdown-menu" style={{ minWidth: '100px' }} aria-labelledby="dropdownMenuButton1">
            {options.map((option: Option, index) => (
               <li key={index} className="dropdown-item py-2" onClick={() => handleState(index)}>
                  <i className={`${option.icon} me-3`}></i>
                  <span>{option.title}</span>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default TweetCreate
