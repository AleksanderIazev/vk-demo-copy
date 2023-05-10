import { IPost } from "../../../types";

export const initialPosts:IPost[] = [
        {
          author:{
            _id:'dfddfd',
            avatar:'https://play-lh.googleusercontent.com/s9hHKX02cVc5NKF4-O8bfy-SLefsjSzz9Ug_PgXhkMnY4E-wZXIbifrykDnEXv4HbpM',
            name:'National Geographic',
          },
          content:'Серебряная осень в Сибири',
          createdAt:new Date(),
          images:[
            'https://www.kaichitravel.com/wp-content/uploads/2017/12/Altai-region-blog.jpg',
            'https://mf.b37mrtl.ru/rbthmedia/images/images/travel/UNESCO_Siberia/lori-0000132207-fullsize.jpg',
            'https://remotelands.com/travelogues/app/uploads/2015/02/Putorana.jpg',
            'https://remotelands.com/travelogues/app/uploads/2015/02/Kamchatka.jpg',
            'https://russiatrek.org/blog/wp-content/uploads/2014/04/natural-park-ergaki-siberia-russia-2.jpg'
          ],
          formattedDate: new Date().toLocaleDateString()
        }
      ]
