import { Link } from 'react-router-dom'

const stringUtils = {
   extractTrends: (text: string) => {
      return text
         .split(' ')
         .filter((word: string) => word.startsWith('#') && word.length > 1)
         .map((word: string) => word.slice(1))
   },
   heighLightTrends: (text: string) => {
      return text.split(' ').map((word: string, index: number) => {
         if (word.startsWith('#') && word.length > 1) {
            return (
               <Link key={index} to={`/trends/${word.slice(1)}`} className="text-primary">
                  {word}
               </Link>
            )
         }
         return <span key={index}> {word} </span>
      })
   },
}

export default stringUtils
