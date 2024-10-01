import localFont from "next/font/local";
import {useEffect, useState} from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type MenuLabelType = '지메추' |'지디추'| '스메추' | '매메추'

type MenuType = {
  label: MenuLabelType;
  description: string;
  menus: string[];
}

const DEFAULT_MENUS = [
    '한식', '양식', '중식', '아시안', '일식', '인도커리', '파스타', '피자', '야키토리', '삼겹살', '국밥', '해장국', '초밥', '라멘', '칼국수', '떡볶이', '순대국', '돼지곱창', '소곱창', '닭발',
]

const DESSERTS = [
    '퀸아망', '딸기케이크', '초코케이크', '크로와상','크로플','크루키','메론빵','아이스크림','몽블랑','빙수','홍콩와플'
]

const STONE_I_MENUS = [
    '찜닭', '굽네', '피자', '순대국', '칼국수', '서브웨이', '버거킹', '보노보스', '야래향',
]

const MAEJIRI_MENUS = [
    '오리훈제', '고모네', '치밥', '학식', '편의점 도시락', '엽떡', '컵밥'
]

const EMOJIS = [
    '🐷','🐰','🌝','🎉','✨','🐙','💥','🍎','🍒','🍑','🥐','🍗','🍔','🎂','🍪','🍩','❤️‍','🔥','🐹','🧚','🔥'
]

const MENU_TYPE : MenuType[] = [
    {
        label: '지메추',
        description:'지나의 메뉴 추천',
        menus:DEFAULT_MENUS,
    },
    {
        label: '지디추',
        description: '지나의 디저트 추천',
        menus: DESSERTS
    },
    {
        label: '스메추',
        description: '스톤아이 저녁 메뉴 추천',
        menus: STONE_I_MENUS

    },
    {
        label: '매메추',
        description: '매지리 메뉴 추천',
        menus: MAEJIRI_MENUS
    }
]

const TypeSelect = ({selectedMenuType, onClickMenuLabel} : {selectedMenuType?:MenuType;onClickMenuLabel: (label: MenuLabelType) => void}) => {
    const labels = MENU_TYPE.map(menu => ( menu.label))

    if (!selectedMenuType) return null;

    return (
    <div className={'flex flex-col gap-2'}>
        <div className={'flex gap-2 justify-center'}>
            {labels.map((label, index) => (
                <p key={index} onClick={() => onClickMenuLabel(label)} className={`text-2xl font-bold cursor-pointer p-2 rounded-2xl ${selectedMenuType.label === label ? `bg-blue-200` : ''}`}>
                    {label}
                </p>
            ))}
        </div>
        <p className={'text-center'}>
            {selectedMenuType.description}
        </p>
    </div>
    )
}

const SelectedMenus = ({selectedMenuType,selectedMenu,setSelectedMenu} : {selectedMenuType?: MenuType; selectedMenu: string; setSelectedMenu: (menu: string) => void; }) => {

    if (!selectedMenuType) return null;

    return (
        <div className={'flex gap-12 flex-col justify-center overflow-hidden'} >
            <div
                key={selectedMenuType.label}
                className={'text-3xl font-bold pt-10 text-center flex gap-4 animate-infinite-scroll'}>
                  {selectedMenuType.menus?.map((menu, index) =>
                      (<div key={menu + index} className={'flex flex-shrink-0'}>
                          {menu}
                      </div>))}
            </div>

            <p className={'text-2xl font-medium text-center cursor-pointer'} onClick={()=>{
                const randomValues = selectedMenuType?.menus[Math.floor(Math.random() * selectedMenuType?.menus.length)];

                setSelectedMenu(randomValues)

            }}>
                추천받기
            </p>

            <p className={'text-6xl font-extrabold text-center pt-20'}>
                {selectedMenu ? `${selectedMenu + (selectedMenu && EMOJIS[Math.floor(Math.random() * EMOJIS.length)])}` : <div className={'h-[119px]'}></div> }
            </p>
        </div>
    )

}

export default function Home() {
    const [selectedMenuLabel, setSelectedMenuLabel] = useState<MenuLabelType>('지메추')
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedMenuType, setSelectedMenuType] = useState<MenuType | undefined>(undefined);

    useEffect(() => {
        setSelectedMenuType(MENU_TYPE.find(menu => menu.label === selectedMenuLabel))
    },[selectedMenuLabel])

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className={'justify-center flex w-full'}>
        <div className={'w-[700px] justify-center align-middle bg-white rounded-[20px]'}>
          <div className={'p-10  shadow-2xl h-[800px] flex flex-col gap-5'}>
              <p className={'font-bold text-3xl text-center pb-10 pt-2'}>
                  🐷 지나가 추천하는 오늘의 메뉴 🐷
              </p>

          <TypeSelect
          selectedMenuType={selectedMenuType}
              onClickMenuLabel={(label: MenuLabelType)=> {
                  setSelectedMenu('')
                  setSelectedMenuLabel(label)
              }}/>

              <SelectedMenus selectedMenuType={selectedMenuType} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
          </div>
        </div>
      </div>

    </div>
  );
}
