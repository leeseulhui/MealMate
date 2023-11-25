import kimchiStewImage from '../images/free-icon-kimchi-2276924.png'
import Bulgogi from '../images/불고기.png'
import bibimbap from '../images/비빔밥.png'
import Jajangmyeon from '../images/짜장면.png'
import MapoTofu from '../images/마파두부.png'
import steak from '../images/스테이크.png'
import pasta from '../images/파스타.png'
import sushi from '../images/초밥.png'
import ramen from '../images/라멘.png'
import Donburi from '../images/돈부리.png'
import Kwabarou from '../images/꿔바로우.png'

const foodOptions = {
    한식: [
        { name: "김치찌개", description: "김치찌개 설명...", image: kimchiStewImage },
        { name: "불고기", description: "불고기 설명...", image: Bulgogi },
        { name: "비빔밥", description: "비빔밥 설명...", image: bibimbap },
    ],
    중식: [
        { name: "짜장면", description: "전통 한국 김치 스튜", image: Jajangmyeon },
        { name: "마파두부", description: "마리네이드된 구이용 소고기", image: MapoTofu },
        { name: "꿔바로우", description: "다양한 나물과 고기, 계란을 곁들인 밥", image: Kwabarou }
    ],
    양식: [
        { name: "스테이크", description: "전통 한국 김치 스튜", image: steak },
        { name: "파스타", description: "마리네이드된 구이용 소고기", image: pasta },
        { name: "비빔밥", description: "다양한 나물과 고기, 계란을 곁들인 밥", image: bibimbap }
    ],
    일식: [
        { name: "초밥", description: "전통 한국 김치 스튜", image: sushi },
        { name: "라멘", description: "마리네이드된 구이용 소고기", image: ramen },
        { name: "돈부리", description: "다양한 나물과 고기, 계란을 곁들인 밥", image: Donburi }
    ],
};

export default foodOptions;
