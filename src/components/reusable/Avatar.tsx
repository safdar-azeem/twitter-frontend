interface Iprops {
   avatar?: string
}

const Avatar = ({ avatar }: Iprops) => {
   return (
      <div>
         {avatar ? (
            <img src={avatar} className="rounded-circle w-40px h-40px me-3" />
         ) : (
            <div className="rounded-circle bg-secondary center text-dark text-opacity-50 w-43px h-43px me-3">
               <i className="fa-solid fa-user"></i>
            </div>
         )}
      </div>
   )
}

export default Avatar
